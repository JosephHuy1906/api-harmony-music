"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("module-alias/register");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class SongPathMigration {
    static async create(db) {
        try {
            const filePath = path_1.default.join(__dirname, '../', 'database', 'backups', 'songpaths.json');
            const fileContent = fs_1.default.readFileSync(filePath, {
                encoding: 'utf-8',
            });
            const fileData = JSON.parse(fileContent);
            const collectionName = 'songpaths';
            const isExits = !!(await db
                .listCollections({ name: collectionName })
                .next());
            if (isExits)
                db.collection(collectionName).drop();
            const result = await db
                .collection(collectionName)
                .insertMany(fileData);
            console.log('Create SongPath collection successfully');
            return result ? true : false;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
}
exports.default = SongPathMigration;
