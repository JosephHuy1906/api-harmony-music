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
const uuid_1 = require("uuid");
const action_enum_1 = require("../constraints/enums/action.enum");
const album_filter_1 = __importDefault(require("../filters/album.filter"));
const validate_helper_1 = __importDefault(require("../helpers/validate.helper"));
const index_instance_1 = require("../instances/index.instance");
class AlbumService {
    constructor() { }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = (0, uuid_1.v4)();
                const composer = yield index_instance_1.userService.getById(payload.userReference);
                if (!composer)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST_COMPOSER_NOT_FOUND',
                    };
                const albumByComposer = yield index_instance_1.albumModel.getByComposerAndTitle(payload.userReference, payload.title);
                if (albumByComposer)
                    return {
                        status: 400,
                        success: false,
                        message: 'TITLE_ALBUM_IS_EXISTING',
                    };
                const albumFilter = new album_filter_1.default(Object.assign(Object.assign({}, payload), { _id, thumbnail: null, thumbnailUrl: null }));
                const isInValidValidator = yield (0, validate_helper_1.default)(albumFilter, 'BAD_REQUEST', true);
                if (isInValidValidator)
                    return isInValidValidator;
                const newAlbum = yield index_instance_1.albumModel.create(albumFilter);
                yield index_instance_1.userModel.updateIncreaseAlbum(payload.userReference, newAlbum._id);
                yield index_instance_1.songModel.updateIncreaseAlbumReference(albumFilter.listSong, albumFilter._id);
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
        });
    }
    updateBySongEventUpdate(listAlbumId, songId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listAlbumBySongId = yield index_instance_1.albumModel.getMultipleBySongReference(listAlbumId, songId);
                const mapping = listAlbumBySongId.map((album) => album._id);
                const filterIdNotPercent = listAlbumId.filter((albumId) => mapping.indexOf(albumId) === -1);
                if (filterIdNotPercent.length) {
                    yield index_instance_1.albumModel.updateManyActionSongReference(filterIdNotPercent, songId, action_enum_1.EnumActionUpdate.PUSH);
                }
                else {
                    const listAllById = (yield index_instance_1.albumModel.getListBySongId(songId)).map((album) => album._id);
                    const listPullListSong = listAllById.filter((albumId) => listAlbumId.indexOf(albumId) === -1);
                    if (listPullListSong.length)
                        yield index_instance_1.albumModel.updateManyActionSongReference(listPullListSong, songId, action_enum_1.EnumActionUpdate.REMOVE);
                }
                return {
                    status: 200,
                    success: true,
                    message: 'UPDATE_ALBUM_SUCCESSFULLY',
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'UPDATE_ALBUM_FAILED',
                    errors: error,
                };
            }
        });
    }
    updateMultipleCollection(listIdAlbum, songId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                listIdAlbum.forEach((id) => __awaiter(this, void 0, void 0, function* () {
                    yield index_instance_1.albumModel.updatedField(id, {
                        listSong: [songId],
                    });
                }));
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    getAlbumNewWeek(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const albumNew = yield index_instance_1.albumModel.getAlbumNewWeek(item);
                const getall = yield index_instance_1.albumModel.getAll();
                if (item === 0 || item > getall.length)
                    return {
                        status: 400,
                        success: false,
                        message: 'Album_LENGTH_NOT_EXIST',
                    };
                return {
                    status: 200,
                    success: true,
                    message: 'GET_ALBUM_NEW_WEEK_SUCCESSFULLY',
                    data: albumNew,
                };
            }
            catch (error) {
                return {
                    status: 500,
                    success: false,
                    message: 'GET_ALBUM_NEW_WEEK_FAILED',
                    errors: error,
                };
            }
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const album = yield index_instance_1.albumModel.getById(_id);
                if (!album)
                    return {
                        status: 400,
                        success: false,
                        message: 'GET_ALBUM_BY_ID_EXISTS',
                    };
                return {
                    status: 200,
                    success: true,
                    message: 'GET_ALBUM_BY_ID_SUCCESSFULLY',
                    data: album,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_ALBUM_BY_ID_FAILED',
                };
            }
        });
    }
    update(_id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (payload.isNewUploadThumbnail && !payload.contentType)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST',
                    };
                const currentAlbum = yield this.getById(_id);
                if (!currentAlbum.success)
                    return currentAlbum;
                const updateAlbum = yield index_instance_1.albumModel.updatedField(_id, payload);
                if (!updateAlbum)
                    throw new Error('CAN_NOT_UPDATE_ALBUM');
                if (payload.listSong) {
                    yield index_instance_1.songService.updateByAlbumEventUpdate(payload.listSong, _id);
                }
                let responseS3Data = undefined;
                if (payload.isNewUploadThumbnail) {
                    const response = yield index_instance_1.s3Service.getSignUrlForUploadAlbum(payload.userId, _id, payload.contentType);
                    if (!response.success)
                        throw new Error('UPLOAD_THUMBNAIL_ALBUM');
                    responseS3Data = response.data;
                }
                return {
                    status: 200,
                    success: true,
                    message: 'UPDATE_ALBUM_SUCCESSFULLY',
                    data: responseS3Data ? responseS3Data : updateAlbum,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'UPDATE_ALBUM_FAILED',
                    errors: error,
                };
            }
        });
    }
    getByIdPopulate(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const album = yield index_instance_1.albumModel.getByIdPopulate(_id);
                if (!album)
                    return {
                        status: 400,
                        success: false,
                        message: 'GET_ALBUM_BY_ID_EXISTS',
                    };
                return {
                    status: 200,
                    success: true,
                    message: 'GET_ALBUM_BY_ID_SUCCESSFULLY',
                    data: album,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_ALBUM_BY_ID_FAILED',
                };
            }
        });
    }
}
exports.default = AlbumService;
//# sourceMappingURL=album.service.js.map