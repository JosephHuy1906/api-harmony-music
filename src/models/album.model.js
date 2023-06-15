"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const album_schema_1 = __importDefault(require("@/database/schemas/album.schema"));
class AlbumModel {
    static async getByComposerAndTitle(idComposer, title) {
        const albumByComposer = await album_schema_1.default.findOne({
            composerReference: idComposer,
            title: { $regex: title, $options: 'i' },
        });
        return albumByComposer;
    }
    static async create(payload) {
        const created = await album_schema_1.default.create(payload);
        return created;
    }
    static async updatedField(id, payload) {
        const updatedField = await album_schema_1.default.findByIdAndUpdate(id, {
            $set: {
                title: payload.title,
                publish: payload.publish,
                information: payload.information,
                composerReference: payload.composerReference,
                updatedAt: payload.updatedAt,
            },
            $push: { listSong: payload.listSong },
        });
        return updatedField;
    }
}
exports.default = AlbumModel;
