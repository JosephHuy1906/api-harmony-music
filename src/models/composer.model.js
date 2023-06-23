"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const composer_schema_1 = __importDefault(require("../database/schemas/composer.schema"));
class ComposerModel {
    static async getComposerByUserId(id) {
        const composer = await composer_schema_1.default.findOne({ userReference: id });
        return composer;
    }
    static async getById(_id) {
        const composer = await composer_schema_1.default.findById(_id);
        return composer;
    }
    static async getListSong(_id) {
        const listSongOfComposer = await composer_schema_1.default.findById(_id).populate({
            path: 'songsReference',
            strictPopulate: true,
            select: 'title',
        });
        return listSongOfComposer;
    }
    static async create(payload) {
        const created = await composer_schema_1.default.create(payload);
        return created;
    }
    static async updatedField(id, payload) {
        const updated = await composer_schema_1.default.findByIdAndUpdate(id, {
            $set: {
                name: payload.name,
                avatar: payload.avatar,
                nickname: payload.nickname,
                country: payload.country,
            },
            $push: {
                songsReference: payload.songsReference,
                albumsReference: payload.albumsReference,
            },
        });
        return updated;
    }
}
exports.default = ComposerModel;
