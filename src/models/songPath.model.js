"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const songPath_schema_1 = __importDefault(require("../database/schemas/songPath.schema"));
class SongPathModel {
    static async getById(id) {
        const songPath = await songPath_schema_1.default.findById(id);
        return songPath;
    }
    static async create(payload) {
        const created = await songPath_schema_1.default.create(payload);
        return created;
    }
    static async forceDelete(id) {
        const forceDelete = await songPath_schema_1.default.findByIdAndDelete(id);
        return forceDelete;
    }
}
exports.default = SongPathModel;
