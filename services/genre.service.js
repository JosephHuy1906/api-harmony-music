"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const genre_model_1 = __importDefault(require("../models/genre.model"));
class GenreService {
    static async create(payload) {
        try {
            const genreByTitle = await genre_model_1.default.getByTitle(payload.title);
            if (genreByTitle)
                return {
                    status: 400,
                    success: false,
                    message: 'BAD_REQUEST_GENRE_TITLE_IS_EXISTING',
                };
            const _id = (0, uuid_1.v4)();
            const create = await genre_model_1.default.create({
                _id,
                ...payload,
            });
            return {
                status: 201,
                success: true,
                message: 'POST_GENRE_SUCCESSFULLY',
                data: create,
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                success: false,
                message: 'POST_GENRE_FAILED',
                errors: error,
            };
        }
    }
    static async updateMultipleCollection(listIdGenre, songId) {
        try {
            listIdGenre.forEach(async (id) => {
                await genre_model_1.default.updatedField(id, {
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
exports.default = GenreService;
