"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const song_schema_1 = __importDefault(require("@/database/schemas/song.schema"));
class SongModel {
    static async getAll() {
        const songs = await song_schema_1.default
            .find()
            .populate({
            path: 'composerReference',
            strictPopulate: true,
            select: 'name slug',
        })
            .populate({
            path: 'albumReference',
            strictPopulate: true,
            select: 'title',
        })
            .populate({
            path: 'genresReference',
            strictPopulate: true,
            select: 'title',
        })
            .populate({
            path: 'performers',
            strictPopulate: true,
            select: 'name slug',
        });
        return songs;
    }
    static async getById(_id) {
        const song = await song_schema_1.default
            .findById(_id)
            .populate({
            path: 'composerReference',
            strictPopulate: true,
            select: 'name slug',
        })
            .populate({
            path: 'albumReference',
            strictPopulate: true,
            select: 'title',
        })
            .populate({
            path: 'genresReference',
            strictPopulate: true,
            select: 'title',
        })
            .populate({
            path: 'performers',
            strictPopulate: true,
            select: 'name slug',
        });
        return song;
    }
    static async create(payload) {
        const created = await song_schema_1.default.create(payload);
        return created;
    }
    static async update(_id, payload) {
        const updated = await song_schema_1.default.findByIdAndUpdate(_id, payload);
        return updated;
    }
    static async forceDelete(id) {
        const forceDelete = await song_schema_1.default.findByIdAndDelete(id);
        return forceDelete;
    }
}
exports.default = SongModel;
