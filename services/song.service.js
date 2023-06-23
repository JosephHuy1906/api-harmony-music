"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const song_repository_1 = __importDefault(require("../repositories/song.repository"));
const song_filter_1 = __importDefault(require("../filters/song.filter"));
const validate_helper_1 = __importDefault(require("../helpers/validate.helper"));
const deleteFile_helper_1 = __importDefault(require("../helpers/deleteFile.helper"));
const thumbnail_model_1 = __importDefault(require("../models/thumbnail.model"));
const songPath_model_1 = __importDefault(require("../models/songPath.model"));
const song_model_1 = __importDefault(require("../models/song.model"));
const composer_model_1 = __importDefault(require("../models/composer.model"));
const genre_service_1 = __importDefault(require("./genre.service"));
const album_service_1 = __importDefault(require("./album.service"));
const composer_service_1 = __importDefault(require("./composer.service"));
const pathSystemLinux_util_1 = require("../utils/pathSystemLinux.util");
class SongService {
    static async getAll() {
        try {
            const songs = await song_model_1.default.getAll();
            return {
                status: 200,
                success: true,
                message: 'GET_ALL_SONG_SUCCESSFULLY',
                data: songs,
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                success: false,
                message: 'GET_ALL_SONG_FAILED',
                errors: error,
            };
        }
    }
    static async getById(_id) {
        try {
            const song = await song_model_1.default.getById(_id);
            if (!song)
                return {
                    status: 400,
                    success: false,
                    message: 'GET_SONG_BY_ID_EXISTS',
                };
            return {
                status: 200,
                success: true,
                message: 'GET_SONG_BY_ID_SUCCESSFULLY',
                data: song,
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                success: false,
                message: 'GET_SONG_BY_ID_FAILED',
            };
        }
    }
    static async getFsStreamSong(idSongPath, range) {
        try {
            const filePath = await songPath_model_1.default.getById(idSongPath);
            if (!filePath)
                return {
                    status: 400,
                    success: false,
                    message: 'GET_STREAM_SONG_ID_NOT_FOUND',
                };
            if (range) {
                const [start, end] = range.replace('bytes=', '').split('-');
                const startByte = parseInt(start, 10);
                const endByte = end ? parseInt(end, 10) : filePath.size - 1;
                const chunkSize = endByte - startByte + 1;
                const fileStream = fs_1.default.createReadStream(filePath.path, {
                    start: startByte,
                    end: endByte,
                });
                return {
                    status: 206,
                    success: true,
                    message: 'GET_FS_STREAM_SONG_SUCCESSFULLY',
                    data: {
                        isRange: true,
                        chunkSize,
                        fileStream,
                        fileSize: filePath.size,
                        resHeader: {
                            'Content-Range': `bytes ${startByte}-${endByte}/${filePath.size}`,
                            'Accept-Ranges': 'bytes',
                            'Content-Length': chunkSize,
                            'Content-Type': 'audio/mpeg',
                        },
                    },
                };
            }
            else {
                const fileStream = fs_1.default.createReadStream(filePath.path);
                return {
                    status: 200,
                    success: true,
                    message: 'GET_FS_STREAM_SONG_SUCCESSFULLY',
                    data: {
                        isRange: false,
                        fileStream,
                        fileSize: filePath.size,
                        resHeader: {
                            'Content-Length': filePath.size,
                            'Content-Type': 'audio/mpeg',
                            'Accept-Ranges': 'bytes',
                        },
                    },
                };
            }
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                success: false,
                message: 'GET_STREAM_SONG_FAILED',
                errors: error,
            };
        }
    }
    static async validateTitleUploadSong(title, composerReference, files) {
        try {
            const composer = await composer_service_1.default.getById(composerReference);
            if (!composer) {
                (0, deleteFile_helper_1.default)(files.fileSong);
                (0, deleteFile_helper_1.default)(files.thumbnail);
                return {
                    status: 400,
                    success: false,
                    message: 'COMPOSER_NOT_EXIST',
                };
            }
            const listSongOfComposer = await composer_service_1.default.getListSongById(composerReference);
            const songs = listSongOfComposer.data.songsReference;
            const isDuplicated = songs.some((song) => song.title.toLowerCase() === title.toLowerCase());
            if (isDuplicated) {
                (0, deleteFile_helper_1.default)(files.fileSong);
                (0, deleteFile_helper_1.default)(files.thumbnail);
                return {
                    status: 400,
                    success: false,
                    message: 'BAD_REQUEST_DUPLICATED_TITLE',
                };
            }
            return {
                status: 200,
                success: true,
                message: 'TRANSFER_NEXT_FUNCTION',
            };
        }
        catch (error) {
            console.log(error);
            (0, deleteFile_helper_1.default)(files.fileSong);
            (0, deleteFile_helper_1.default)(files.thumbnail);
            return {
                status: 500,
                success: false,
                message: 'UPLOAD_SONG_FAILED',
                errors: error,
            };
        }
    }
    static async create(files, payload) {
        try {
            Object.assign(payload, {
                albumReference: payload.albumReference
                    ? JSON.parse(payload.albumReference)
                    : undefined,
                genresReference: JSON.parse(payload.genresReference),
                performers: JSON.parse(payload.performers),
            });
            const fileSongInfo = await song_repository_1.default.getInformationFileSong(files.fileSong);
            const _id = (0, uuid_1.v4)();
            const songFilter = new song_filter_1.default({
                ...payload,
                _id,
                duration: fileSongInfo.format.duration,
            });
            const songInValid = await (0, validate_helper_1.default)(songFilter, 'BAD_REQUEST', true);
            if (songInValid)
                return songInValid;
            const createThumbnail = await thumbnail_model_1.default.create({
                _id: (0, uuid_1.v4)(),
                path: (0, pathSystemLinux_util_1.pathFromSystem)(files.thumbnail.path, process.platform),
            });
            const createSongPath = await songPath_model_1.default.create({
                _id: (0, uuid_1.v4)(),
                path: (0, pathSystemLinux_util_1.pathFromSystem)(files.fileSong.path, process.platform),
                size: fileSongInfo.format.size,
                type: files.fileSong.mimetype,
            });
            Object.assign(songFilter, {
                thumbnail: `${process.env.SERVER_URL}:${process.env.PORT_SERVER}/api/v1/thumbnail/${createThumbnail._id}`,
                songPathReference: createSongPath._id,
            });
            const createdSong = await song_model_1.default.create(songFilter);
            const injectorComposer = await composer_model_1.default.updatedField(payload.composerReference, { songsReference: createdSong._id });
            const injectorGenre = await genre_service_1.default.updateMultipleCollection(payload.genresReference, createdSong._id);
            if (!!payload.albumReference) {
                await album_service_1.default.updateMultipleCollection(payload.albumReference, createdSong._id);
            }
            if (!injectorComposer || !injectorGenre) {
                await thumbnail_model_1.default.forceDelete(createThumbnail._id);
                await songPath_model_1.default.forceDelete(createSongPath._id);
                await song_model_1.default.forceDelete(createdSong._id);
                return {
                    status: 400,
                    success: false,
                    message: 'BAD_REQUEST_NOT_EXIST_COMPOSER',
                };
            }
            return {
                status: 201,
                success: true,
                message: 'POST_SONG_SUCCESSFULLY',
                data: createdSong,
            };
        }
        catch (error) {
            console.log(error);
            (0, deleteFile_helper_1.default)(files.fileSong);
            (0, deleteFile_helper_1.default)(files.thumbnail);
            return {
                status: 500,
                success: false,
                message: 'POST_SONG_FAILED',
                errors: error,
            };
        }
    }
}
exports.default = SongService;
