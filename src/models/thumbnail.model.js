"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const thumbnail_schema_1 = __importDefault(require("../database/schemas/thumbnail.schema"));
class ThumbnailModel {
    static async getById(id) {
        const thumbnail = await thumbnail_schema_1.default.findById(id);
        return thumbnail;
    }
    static async create(payload) {
        const created = await thumbnail_schema_1.default.create(payload);
        return created;
    }
    static async forceDelete(id) {
        const forceDelete = await thumbnail_schema_1.default.findByIdAndDelete(id);
        return forceDelete;
    }
}
exports.default = ThumbnailModel;
