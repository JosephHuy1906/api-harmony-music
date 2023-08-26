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
const action_enum_1 = require("@/constraints/enums/action.enum");
const playlist_filter_1 = __importDefault(require("@/filters/playlist.filter"));
const validate_helper_1 = __importDefault(require("@/helpers/validate.helper"));
const model_instance_1 = require("@/instances/model.instance");
class PlaylistService {
    constructor() { }
    getListByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const playlists = yield model_instance_1.playlistModel.getListByUserIdPopulate(userId);
                return {
                    status: 200,
                    success: true,
                    message: 'GET_PLAYLIST_SUCCESSFULLY',
                    data: playlists,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_PLAYLIST_FAILED',
                    errors: error,
                };
            }
        });
    }
    getById(playlistId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const playlist = yield model_instance_1.playlistModel.getByIdPopulate(playlistId);
                return {
                    status: 200,
                    success: true,
                    message: 'GET_PLAYLIST_SUCCESSFULLY',
                    data: playlist,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_PLAYLIST_FAILED',
                    errors: error,
                };
            }
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentPlaylist = yield model_instance_1.playlistModel.getByTitle(payload.title);
                if (currentPlaylist)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST',
                    };
                const _id = (0, uuid_1.v4)();
                const playlistFilter = new playlist_filter_1.default({
                    _id,
                    title: payload.title,
                    listSong: [],
                    userReference: payload.userId,
                });
                const validatePayload = yield (0, validate_helper_1.default)(playlistFilter, 'BAD_REQUEST', true);
                if (validatePayload)
                    return validatePayload;
                const created = yield model_instance_1.playlistModel.create(playlistFilter);
                return {
                    status: 201,
                    success: true,
                    message: 'POST_PLAYLIST_SUCCESSFULLY',
                    data: created,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'POST_PLAYLIST_FAILED',
                    errors: error,
                };
            }
        });
    }
    update(_id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!payload.songId || (payload.songId && !payload.typeAction))
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST',
                    };
                const currentPlaylist = yield model_instance_1.playlistModel.getById(_id);
                if (!currentPlaylist)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST',
                    };
                switch (payload.typeAction) {
                    case action_enum_1.EnumActionUpdate.PUSH:
                        const isExits = currentPlaylist.listSong.indexOf(payload.songId) !== -1;
                        if (isExits)
                            return {
                                status: 200,
                                success: true,
                                message: 'UPDATE_PLAYLIST_SUCCESSFULLY',
                                data: null,
                            };
                        const updated = yield model_instance_1.playlistModel.updateByAction(_id, {
                            title: payload.title,
                            songId: payload.songId,
                        }, payload.typeAction);
                        return {
                            status: 200,
                            success: true,
                            message: 'UPDATE_PLAYLIST_SUCCESSFULLY',
                            data: updated,
                        };
                    case action_enum_1.EnumActionUpdate.REMOVE:
                        const isExitsPlaylist = currentPlaylist.listSong.indexOf(payload.songId) !== -1;
                        if (!isExitsPlaylist)
                            return {
                                status: 200,
                                success: true,
                                message: 'UPDATE_PLAYLIST_SUCCESSFULLY',
                                data: null,
                            };
                        const updateByPull = yield model_instance_1.playlistModel.updateByAction(_id, {
                            title: payload.title,
                            songId: payload.songId,
                        }, payload.typeAction);
                        return {
                            status: 200,
                            success: true,
                            message: 'UPDATE_PLAYLIST_SUCCESSFULLY',
                            data: updateByPull,
                        };
                    default:
                        throw new Error('INVALID_TYPE_ACTON');
                }
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'UPDATE_PLAYLIST_FAILED',
                    errors: error,
                };
            }
        });
    }
    forceDelete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield model_instance_1.playlistModel.forceDelete(_id);
                return {
                    status: 200,
                    success: true,
                    message: 'FORCE_DELETE_PLAYLIST_SUCCESSFULLY',
                    data: deleted,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'FORCE_DELETE_PLAYLIST_FAILED',
                    errors: error,
                };
            }
        });
    }
}
exports.default = PlaylistService;
//# sourceMappingURL=playlist.service.js.map