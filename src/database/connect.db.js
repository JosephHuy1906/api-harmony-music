"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    static async connect() {
        try {
            mongoose_1.default.set('strictQuery', true);
            await mongoose_1.default.connect(process.env.DATABASE_URL, {});
            console.log('Connected database successfully!!!');
            return mongoose_1.default.connection.db;
        }
        catch (error) {
            console.log('Failed to connect to database!!!');
            return mongoose_1.default.connection.db;
        }
    }
    static async disconnect() {
        try {
            mongoose_1.default.connection.close();
            mongoose_1.default.disconnect();
            console.log('Disconnected from the database!');
        }
        catch (error) {
            console.log('Fail to disconnect from the database!');
        }
    }
}
exports.default = Database;
