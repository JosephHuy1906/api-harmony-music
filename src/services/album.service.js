"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const album_model_1 = __importDefault(require("@/models/album.model"));
const composer_model_1 = __importDefault(require("@/models/composer.model"));
const composer_service_1 = __importDefault(require("./composer.service"));
class AlbumService {
    static async create(payload) {
        try {
            const _id = (0, uuid_1.v4)();
            const composer = await composer_model_1.default.getById(payload.composerReference);
            if (!composer)
                return {
                    status: 400,
                    success: false,
                    message: 'BAD_REQUEST_COMPOSER_NOT_FOUND',
                };
            const albumByComposer = await album_model_1.default.getByComposerAndTitle(payload.composerReference, payload.title);
            if (albumByComposer)
                return {
                    status: 400,
                    success: false,
                    message: 'TITLE_ALBUM_IS_EXISTING',
                };
            const newAlbum = await album_model_1.default.create({
                _id,
                ...payload,
            });
            await composer_service_1.default.updateFieldGenre(payload.composerReference, newAlbum._id);
            return {
                status: 201,
                success: true,
                message: 'POST_ALBUM_SUCCESSFULLY',
                data: newAlbum,
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                success: false,
                message: 'POST_ALBUM_FAILED',
                errors: error,
            };
        }
    }
    static async updateMultipleCollection(listIdAlbum, songId) {
        try {
            listIdAlbum.forEach(async (id) => {
                await album_model_1.default.updatedField(id, {
                    listSong: [songId],
                });
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
exports.default = AlbumService;
