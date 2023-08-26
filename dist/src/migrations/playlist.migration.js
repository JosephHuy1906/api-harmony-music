"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class PlaylistMigration {
    static create(db) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filePath = path_1.default.join(__dirname, '../', 'database', 'backups', 'playlists.json');
                const fileContent = fs_1.default.readFileSync(filePath, {
                    encoding: 'utf-8',
                });
                const fileData = JSON.parse(fileContent);
                const collectionName = 'playlists';
                const isExits = !!(yield db
                    .listCollections({ name: collectionName })
                    .next());
                if (isExits)
                    db.collection(collectionName).drop();
                const result = yield db
                    .collection(collectionName)
                    .insertMany(fileData);
                console.log('create playlists collection successfully');
                return result ? true : false;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
}
exports.default = PlaylistMigration;
//# sourceMappingURL=playlist.migration.js.map