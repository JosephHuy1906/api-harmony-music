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
const favorite_filter_1 = __importDefault(require("../filters/favorite.filter"));
const validate_helper_1 = __importDefault(require("../helpers/validate.helper"));
const index_instance_1 = require("../instances/index.instance");
class FavoriteService {
    information(userId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_instance_1.userModel.getById(userId);
                if (!user)
                    return {
                        status: 400,
                        success: false,
                        message: 'USER_NOT_FOUND',
                    };
                const favorite = yield index_instance_1.favoriteModel.getByIdPoPulate((_a = user.favoriteListReference) !== null && _a !== void 0 ? _a : '');
                if (!favorite)
                    return {
                        status: 400,
                        success: false,
                        message: 'FAVORITE_NOT_FOUND',
                    };
                return {
                    status: 200,
                    success: true,
                    message: 'GET_FAVORITE_SUCCESSFULLY',
                    data: favorite,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_FAVORITE_FAILED',
                    errors: error,
                };
            }
        });
    }
    combineCreateUpdate(userId, songId, actions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_instance_1.userModel.getById(userId);
                const song = yield index_instance_1.songModel.getById(songId);
                if (!song || !user)
                    return {
                        status: 400,
                        success: false,
                        message: 'SONG_ID_NOT_FOUND',
                    };
                if (user.favoriteListReference && actions) {
                    const updated = yield this.update(user.favoriteListReference, songId, actions);
                    if (!updated)
                        return {
                            status: 400,
                            success: false,
                            message: 'UPDATE_FAVORITE_FAILED',
                        };
                    return {
                        status: 200,
                        success: true,
                        message: 'UPDATE_FAVORITE_SUCCESSFULLY',
                        data: updated,
                    };
                }
                else {
                    const created = yield this.create(userId, (_a = user.favoriteListReference) !== null && _a !== void 0 ? _a : '', songId);
                    if (created === null)
                        return {
                            status: 400,
                            success: false,
                            message: 'CREATE_FAVORITE_FAILED',
                        };
                    return {
                        status: 201,
                        success: true,
                        message: 'CREATE_FAVORITE_SUCCESSFULLY',
                        data: created,
                    };
                }
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'COMBINE_FAVORITE_FAILED',
                    errors: error,
                };
            }
        });
    }
    create(userId, currentFavoriteId, songId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validFavorite = yield index_instance_1.favoriteModel.getById(currentFavoriteId);
                if (validFavorite)
                    return null;
                const _id = (0, uuid_1.v4)();
                const favoriteFilter = new favorite_filter_1.default({
                    _id,
                    listSong: [songId],
                    userReference: userId,
                });
                const isInvalid = yield (0, validate_helper_1.default)(favoriteFilter, 'BAD_REQUEST', true);
                if (isInvalid)
                    return null;
                const create = yield index_instance_1.favoriteModel.create(favoriteFilter);
                yield index_instance_1.userModel.updateById(userId, {
                    favoriteListReference: create._id,
                });
                return create;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    update(_id, songId, actions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentFavorite = yield index_instance_1.favoriteModel.getById(_id);
                if (!currentFavorite)
                    return null;
                switch (actions) {
                    case action_enum_1.EnumActionUpdate.PUSH:
                        const isInvalid = currentFavorite.listSong.some((id) => id === songId);
                        if (isInvalid)
                            return null;
                        const pushUpdate = yield index_instance_1.favoriteModel.updateByAction(_id, songId, actions);
                        return pushUpdate;
                    case action_enum_1.EnumActionUpdate.REMOVE:
                        const isInvalidRemove = currentFavorite.listSong.some((id) => id === songId);
                        if (!isInvalidRemove)
                            return null;
                        const removeUpdate = yield index_instance_1.favoriteModel.updateByAction(_id, songId, actions);
                        return removeUpdate;
                    default:
                        throw new Error('Invalid action favorite it not match push or remove');
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.default = FavoriteService;
// ngày mai làm phần update favorite
// update genres flow như album
// update history
// update song
// delete cho từng collection
// queue currency
//# sourceMappingURL=favorite.service.js.map