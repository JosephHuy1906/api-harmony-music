"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genre_schema_1 = __importDefault(require("@/database/schemas/genre.schema"));
class GenreModel {
    static async getByTitle(title) {
        const genreByTitle = await genre_schema_1.default.findOne({
            title: { $regex: title, $options: 'i' },
        });
        return genreByTitle;
    }
    static async create(payload) {
        const created = await genre_schema_1.default.create(payload);
        return created;
    }
    static async updatedField(id, payload) {
        const updatedField = await genre_schema_1.default.findByIdAndUpdate(id, {
            $set: {
                title: payload.title,
                updatedAt: payload.updatedAt,
            },
            $push: { listSong: payload.listSong },
        });
        return updatedField;
    }
}
exports.default = GenreModel;
