"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const user_model_1 = __importDefault(require("../models/user.model"));
const composer_model_1 = __importDefault(require("../models/composer.model"));
class ComposerService {
    static async getById(_id) {
        try {
            const composer = await composer_model_1.default.getById(_id);
            return {
                status: 200,
                success: true,
                message: 'GET_COMPOSER_BY_ID_SUCCESSFULLY',
                data: composer,
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                success: false,
                message: 'GET_COMPOSER_BY_ID_FAILED',
                errors: error,
            };
        }
    }
    static async getListSongById(_id) {
        try {
            const composer = await composer_model_1.default.getListSong(_id);
            return {
                status: 200,
                success: true,
                message: 'GET_COMPOSER_BY_ID_SUCCESSFULLY',
                data: composer,
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                success: false,
                message: 'GET_COMPOSER_BY_ID_FAILED',
                errors: error,
            };
        }
    }
    static async create(payload) {
        try {
            const user = await user_model_1.default.getById(payload._id);
            if (!user)
                return {
                    status: 400,
                    success: false,
                    message: 'USER_NOT_EXIST',
                };
            const composerByUserId = await composer_model_1.default.getComposerByUserId(payload._id);
            if (composerByUserId)
                return {
                    status: 400,
                    success: false,
                    message: 'COMPOSER_IS_EXISTED',
                };
            const _id = (0, uuid_1.v4)();
            let randomEntryPointSlug = 0;
            do {
                randomEntryPointSlug = Math.floor(Math.random() * 10000);
            } while (randomEntryPointSlug < 1000);
            const nickname = (user.name
                .normalize('NFD')
                .replace(/[^a-z0-9\s]/gi, '')
                .toLocaleLowerCase()
                .replace(/\s+/g, '') ?? '') +
                (randomEntryPointSlug < 1000
                    ? randomEntryPointSlug * 10
                    : randomEntryPointSlug);
            const createdComposer = await composer_model_1.default.create({
                _id,
                name: user.name,
                nickname,
                avatar: user.avatar ?? undefined,
                userReference: payload._id,
                country: user.locale,
            });
            await user_model_1.default.updateById(user._id, {
                composerReference: createdComposer._id,
            });
            return {
                status: 201,
                success: true,
                message: 'POST_COMPOSER_SUCCESSFULLY',
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                success: false,
                message: 'POST_COMPOSER_FAILED',
                errors: error,
            };
        }
    }
    static async updateFieldGenre(id, genreId) {
        try {
            await composer_model_1.default.updatedField(id, {
                albumsReference: [genreId],
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
exports.default = ComposerService;
