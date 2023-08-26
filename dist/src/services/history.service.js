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
const history_filter_1 = __importDefault(require("@/filters/history.filter"));
const validate_helper_1 = __importDefault(require("@/helpers/validate.helper"));
const index_instance_1 = require("@/instances/index.instance");
class HistoryService {
    getInformation(userId) {
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
                const history = yield index_instance_1.historyModel.getByIdPoPulate((_a = user.historyReference) !== null && _a !== void 0 ? _a : '');
                if (!history)
                    return {
                        status: 400,
                        success: false,
                        message: 'HISTORY_NOT_FOUND',
                    };
                return {
                    status: 200,
                    success: true,
                    message: 'GET_HISTORY_SUCCESSFULLY',
                    data: history,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_HISTORY_INFO_FAILED',
                    errors: error,
                };
            }
        });
    }
    bothCreateUpdate(userId, songId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_instance_1.userModel.getById(userId);
                const song = yield index_instance_1.songModel.getById(songId);
                if (!song)
                    return {
                        status: 400,
                        success: false,
                        message: 'SONG_HAS_ID_NOT_FOUND',
                    };
                if (user && user.historyReference) {
                    const history = yield this.update(user.historyReference, songId);
                    return {
                        status: 200,
                        success: true,
                        message: 'PUSH_SONGS_INTO_HISTORY_SUCCESSFULLY',
                        data: history,
                    };
                }
                else {
                    const history = yield this.create((_a = user === null || user === void 0 ? void 0 : user._id) !== null && _a !== void 0 ? _a : '', song._id);
                    return {
                        status: 201,
                        success: true,
                        message: 'CREATE_SONGS_INTO_HISTORY_SUCCESSFULLY',
                        data: history,
                    };
                }
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'CANT_PUSH_LIST_SONG_IN_TO_HISTORY',
                    errors: error,
                };
            }
        });
    }
    create(userId, songId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = (0, uuid_1.v4)();
                const historyFilter = new history_filter_1.default({
                    _id,
                    userReference: userId,
                    listSong: [songId],
                });
                const inValid = yield (0, validate_helper_1.default)(historyFilter, 'BAD_REQUEST', true);
                if (inValid)
                    throw new Error(JSON.stringify(inValid));
                const createHistory = yield index_instance_1.historyModel.create(historyFilter);
                if (!createHistory)
                    throw new Error('POST_HISTORY_FAILED');
                const updateSong = yield index_instance_1.userModel.updateById(userId, {
                    historyReference: createHistory._id,
                });
                if (!updateSong) {
                    yield index_instance_1.historyModel.forceDelete(createHistory._id);
                    return null;
                }
                return createHistory;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    update(_id, songId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentHistory = yield index_instance_1.historyModel.getById(_id);
                if (!currentHistory)
                    return null;
                const isValidPushSong = currentHistory.listSong.some((song) => song === songId);
                if (isValidPushSong)
                    return null;
                const updated = yield index_instance_1.historyModel.updateByAction(_id, songId, action_enum_1.EnumActionUpdate.PUSH);
                if (updated && updated.listSong.length > 30) {
                    yield index_instance_1.historyModel.removeFirstSongIntoListSong(updated._id);
                }
                return updated;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.default = HistoryService;
//# sourceMappingURL=history.service.js.map