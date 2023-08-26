"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const uuid_1 = require("uuid");
(0, dotenv_1.config)();
const action_enum_1 = require("../constraints/enums/action.enum");
const song_filter_1 = __importDefault(require("../filters/song.filter"));
const validate_helper_1 = __importDefault(require("../helpers/validate.helper"));
const index_instance_1 = require("../instances/index.instance");
const index_queue_1 = __importDefault(require("../queues/index.queue"));
class SongService {
    constructor() {
        this.taskQueue = new index_queue_1.default(10);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const songs = yield index_instance_1.songModel.getAll();
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
        });
    }
    getJustReleased(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const songs = yield index_instance_1.songModel.getSongJustReleasedPopulate(item);
                const getall = yield index_instance_1.songModel.getAll();
                if (item == 0 || item > getall.length)
                    return {
                        status: 400,
                        success: false,
                        message: 'LIST_SONG_QUERY_PARMAS_NOT_EXITS',
                    };
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
                    message: 'GET_SONG_JUST_RELEASED_FAILED',
                    errors: error,
                };
            }
        });
    }
    getTopView(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const songs = yield index_instance_1.songModel.getSongTopView(item);
                if (item === 0)
                    return {
                        status: 400,
                        success: false,
                        message: 'SONG_LENGTH_NOT_EXIST',
                    };
                return {
                    status: 200,
                    success: true,
                    message: 'GET_SONG_TOP_SUCCESSFULLY',
                    data: songs,
                };
            }
            catch (error) {
                return {
                    status: 500,
                    success: false,
                    message: 'GET_SONG_TOP_FAILED',
                    errors: error,
                };
            }
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const song = yield index_instance_1.songModel.getById(_id);
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
        });
    }
    search(title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const song = yield index_instance_1.songModel.search(title);
                const album = yield index_instance_1.albumModel.search(title);
                const performers = yield index_instance_1.userModel.search(title);
                const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(title);
                if (hasSpecialChar)
                    return {
                        status: 400,
                        success: false,
                        message: 'INPUT_HAS_SECIAL_CHARACTER',
                    };
                const data = {
                    songs: song,
                    albums: album,
                    performers: performers,
                };
                return {
                    status: 200,
                    success: true,
                    message: 'GET_SONG_AND_ALBUM_SEARCH_SUCCESSFULLY',
                    data: data,
                };
            }
            catch (error) {
                return {
                    status: 500,
                    success: false,
                    message: 'GET_SONG_AND_ALBUM_FAILED',
                    errors: error,
                };
            }
        });
    }
    suggest(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                page = page === 0 ? 1 : page;
                size = size === 0 ? 10 : size;
                const songs = yield index_instance_1.songModel.getAll();
                const skip = size * (page - 1);
                const totalPages = Math.ceil(songs.length / size);
                const currentPage = songs.splice(skip, size);
                return {
                    status: 200,
                    success: true,
                    message: 'GET_SUGGEST_SONGS_SUCCESSFULLY',
                    data: currentPage,
                    paging: {
                        page,
                        size,
                        totalItems: currentPage.length || 0,
                        totalPages,
                    },
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_SUGGEST_SONGS_FAILED',
                    errors: error,
                };
            }
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentSongDraft = yield index_instance_1.songDraftModel.getById(payload.uploadId);
                const isFailedCheckFirst = !currentSongDraft || payload.uploadId !== currentSongDraft._id;
                if (isFailedCheckFirst)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST_UPLOAD_SONG',
                    };
                const isFailedCheckSecond = !currentSongDraft.audio && currentSongDraft.thumbnail === null;
                if (isFailedCheckSecond)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST_UPLOAD_SONG',
                    };
                const _id = (0, uuid_1.v4)();
                const songFilter = new song_filter_1.default({
                    _id,
                    thumbnailUrl: `${process.env.SERVER_URL}:${process.env.PORT_SERVER}/api/v1/thumbnail/${_id}`,
                    thumbnail: {
                        bucketName: currentSongDraft.thumbnail.bucketName,
                        keyObject: currentSongDraft.thumbnail.keyObject,
                        contentType: currentSongDraft.thumbnail.contentType,
                    },
                    audio: {
                        bucketName: currentSongDraft.audio.bucketName,
                        keyObject: currentSongDraft.audio.keyObject,
                        contentType: currentSongDraft.audio.contentType,
                    },
                    genresReference: payload.genresReference,
                    albumReference: payload.albumReference,
                    performers: payload.performers,
                    publish: payload.publish,
                    title: payload.title,
                    userReference: payload.userReference,
                });
                const songInValid = yield (0, validate_helper_1.default)(songFilter, 'BAD_REQUEST', true);
                if (songInValid)
                    return songInValid;
                const create = yield index_instance_1.songModel.create(songFilter);
                if (!create)
                    throw new Error('POST_SONG_FAILED');
                yield index_instance_1.genreModel.updateManyActionSongReference(songFilter.genresReference, songFilter._id, action_enum_1.EnumActionUpdate.PUSH);
                yield index_instance_1.userModel.updateIncreaseSongReferenceById(currentSongDraft.userReference, songFilter._id);
                if (songFilter.albumReference && songFilter.albumReference.length) {
                    yield index_instance_1.albumModel.updateManyActionSongReference(songFilter.albumReference, songFilter._id, action_enum_1.EnumActionUpdate.PUSH);
                }
                const removeSongDraft = yield index_instance_1.songDraftModel.forceDelete(currentSongDraft._id);
                if (!removeSongDraft)
                    throw new Error('POST_SONG_FAILED');
                return {
                    status: 201,
                    success: true,
                    message: 'POST_SONG_SUCCESSFULLY',
                    data: create,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'POST_SONG_FAILED',
                    errors: error,
                };
            }
        });
    }
    update(_id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (payload.isNewUploadAvatar && !payload.contentType)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST',
                    };
                const updateInformation = yield index_instance_1.songModel.updateField(_id, payload);
                if (!updateInformation)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST',
                    };
                if (payload.albumReference)
                    index_instance_1.albumService.updateBySongEventUpdate(payload.albumReference, _id);
                if (payload.genresReference)
                    index_instance_1.genreService.updateBySongEventUpdate(payload.genresReference, _id);
                let updateThumbnail = undefined;
                if (payload.isNewUploadAvatar && payload.contentType) {
                    updateThumbnail =
                        yield index_instance_1.s3Service.getSignUrlForUploadThumbnailSong(_id, payload.contentType);
                    if (!updateThumbnail.success)
                        return updateThumbnail;
                }
                return {
                    status: 200,
                    success: true,
                    message: 'PUT_SONG_SUCCESSFULLY',
                    data: !!updateThumbnail ? updateThumbnail : updateInformation,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'PUT_SONG_FAILED',
                    errors: error,
                };
            }
        });
    }
    forceDelete(_id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const responseCurrentSong = yield this.getById(_id);
                if (!responseCurrentSong.data)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST',
                    };
                const checkIsUserPermission = responseCurrentSong.data.userReference._id;
                if (checkIsUserPermission !== userId)
                    return {
                        status: 403,
                        success: false,
                        message: 'FORBIDDEN',
                    };
                const deleteFileS3Response = yield index_instance_1.s3Service.deleteFileOnS3(responseCurrentSong.data.audio);
                // thiếu 1 phần delete thumbnail
                if (!deleteFileS3Response.success)
                    return deleteFileS3Response;
                const deleteSong = yield index_instance_1.songModel.forceDelete(_id);
                if (!deleteSong)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST',
                    };
                yield index_instance_1.albumModel.updateDetachListSong(responseCurrentSong.data._id);
                yield index_instance_1.favoriteModel.updateDetachListSong(responseCurrentSong.data._id);
                yield index_instance_1.genreModel.updateDetachListSong(responseCurrentSong.data._id);
                yield index_instance_1.historyModel.updateDetachListSong(responseCurrentSong.data._id);
                yield index_instance_1.userModel.updateDetachListSong(responseCurrentSong.data._id);
                yield index_instance_1.playlistModel.updateDetachListSong(responseCurrentSong.data._id);
                return {
                    status: 200,
                    success: true,
                    message: 'FORCE_DELETE_SUCCESSFULLY',
                    data: deleteSong,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'DELETE_SONG_FAILED',
                    errors: error,
                };
            }
        });
    }
    getStreamSong(_id, range) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentSong = yield index_instance_1.songModel.getByIdNoPopulate(_id);
                if (!currentSong)
                    return {
                        status: 400,
                        success: false,
                        message: 'GET_STREAM_SONG_NOT_EXIST',
                    };
                if (range) {
                    const fileContent = yield index_instance_1.s3Service.getFileContentS3({
                        bucketName: currentSong.audio.bucketName,
                        contentType: currentSong.audio.contentType,
                        keyObject: currentSong.audio.keyObject,
                        range,
                    });
                    return {
                        status: 206,
                        success: true,
                        message: 'GET_FS_STREAM_SONG_SUCCESSFULLY',
                        data: {
                            instanceContent: fileContent.data,
                            resHeader: {
                                'Accept-Ranges': 'bytes',
                                'Content-Range': fileContent.data
                                    ? fileContent.data.ContentRange || '0-0/0'
                                    : '0-0/0',
                                'Content-Length': (fileContent.data &&
                                    fileContent.data.ContentLength) ||
                                    0,
                                'Content-Type': currentSong.audio.contentType,
                            },
                        },
                    };
                }
                else {
                    const fileContent = yield index_instance_1.s3Service.getFileContentS3({
                        bucketName: currentSong.audio.bucketName,
                        contentType: currentSong.audio.contentType,
                        keyObject: currentSong.audio.keyObject,
                    });
                    return {
                        status: 200,
                        success: true,
                        message: 'GET_FS_STREAM_SONG_SUCCESSFULLY',
                        data: {
                            instanceContent: fileContent.data,
                            resHeader: {
                                'Accept-Ranges': 'bytes',
                                'Content-Length': (fileContent.data &&
                                    fileContent.data.ContentLength) ||
                                    0,
                                'Content-Type': currentSong.audio.contentType,
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
        });
    }
    updateByAlbumEventUpdate(listSongId, albumId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listSongByAlbumId = yield index_instance_1.songModel.getMultipleByAlbumReference(listSongId, albumId);
                const mapping = listSongByAlbumId.map((song) => song._id);
                const filterIdNotPercent = listSongId.filter((songId) => mapping.indexOf(songId) === -1);
                if (filterIdNotPercent.length) {
                    yield index_instance_1.songModel.updateByAction(filterIdNotPercent, {
                        albumReference: [albumId],
                    }, action_enum_1.EnumActionUpdate.PUSH);
                }
                else {
                    const listAllById = (yield index_instance_1.songModel.getListByAlbumReference(albumId)).map((song) => song._id);
                    const listPullListSong = listAllById.filter((songId) => listSongId.indexOf(songId) === -1);
                    if (listPullListSong.length)
                        yield index_instance_1.songModel.updateByAction(listPullListSong, {
                            albumReference: [albumId],
                        }, action_enum_1.EnumActionUpdate.REMOVE);
                }
                return {
                    status: 200,
                    success: true,
                    message: 'UPDATE_LITS_SONG_BY_ALBUM_ID_SUCCESSFULLY',
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'UPDATE_LITS_SONG_BY_ALBUM_ID_FAILED',
                    errors: error,
                };
            }
        });
    }
    updateByGenreEventUpdate(listSongId, genreId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listSongByGenreId = yield index_instance_1.songModel.getMultipleByGenreReference(listSongId, genreId);
                const mapping = listSongByGenreId.map((song) => song._id);
                const filterIdNotPercent = listSongId.filter((songId) => mapping.indexOf(songId) === -1);
                if (filterIdNotPercent.length) {
                    yield index_instance_1.songModel.updateByAction(filterIdNotPercent, {
                        genresReference: [genreId],
                    }, action_enum_1.EnumActionUpdate.PUSH);
                }
                else {
                    const listAllById = (yield index_instance_1.songModel.getListByGenreReference(genreId)).map((song) => song._id);
                    const listPullListSong = listAllById.filter((songId) => listSongId.indexOf(songId) === -1);
                    if (listPullListSong.length)
                        yield index_instance_1.songModel.updateByAction(listPullListSong, {
                            genresReference: [genreId],
                        }, action_enum_1.EnumActionUpdate.REMOVE);
                }
                return {
                    status: 200,
                    success: true,
                    message: 'UPDATE_LITS_SONG_BY_GENRE_ID_SUCCESSFULLY',
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'UPDATE_LITS_SONG_BY_GENRE_ID_FAILED',
                    errors: error,
                };
            }
        });
    }
    increaseViewQueue(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.taskQueue.add(() => __awaiter(this, void 0, void 0, function* () {
                    const increase = yield index_instance_1.songModel.increaseView(_id);
                    if (!increase)
                        throw new Error('BAD_REQUEST');
                }));
                return {
                    status: 200,
                    success: true,
                    message: 'UPDATE_VIEW_SONG_SUCCESSFULLY',
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'UPDATE_VIEW_SONG_FAILED',
                    errors: error,
                };
            }
        });
    }
}
exports.default = SongService;
//# sourceMappingURL=song.service.js.map