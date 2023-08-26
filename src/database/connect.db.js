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
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                mongoose_1.default.set('strictQuery', true);
                yield mongoose_1.default.connect(process.env.DATABASE_URL, {});
                console.log('Connected database successfully!!!');
                return mongoose_1.default.connection.db;
            }
            catch (error) {
                console.log('Failed to connect to database!!!');
                return mongoose_1.default.connection.db;
            }
        });
    }
    static disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                mongoose_1.default.connection.close();
                mongoose_1.default.disconnect();
                console.log('Disconnected from the database!');
            }
            catch (error) {
                console.log('Fail to disconnect from the database!');
            }
        });
    }
}
exports.default = Database;
//# sourceMappingURL=connect.db.js.map