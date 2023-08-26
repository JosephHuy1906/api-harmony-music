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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const action_enum_1 = require("@/constraints/enums/action.enum");
const index_instance_1 = require("@/instances/index.instance");
class GenreService {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const genreByTitle = yield index_instance_1.genreModel.getByTitle(payload.title);
                if (genreByTitle)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST_GENRE_TITLE_IS_EXISTING',
                    };
                const _id = (0, uuid_1.v4)();
                const create = yield index_instance_1.genreModel.create(Object.assign({ _id }, payload));
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
        });
    }
    updateById(_id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentGenre = yield index_instance_1.genreModel.getById(_id);
                if (!currentGenre)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST',
                    };
                const updated = yield index_instance_1.genreModel.updatedField(_id, {
                    title: payload.title,
                    listSong: payload.listSong,
                });
                if (!updated)
                    throw new Error('UPDATED_FAILED');
                if (payload.listSong) {
                    const updateListSong = yield index_instance_1.songService.updateByGenreEventUpdate(payload.listSong, _id);
                    if (!updateListSong.success)
                        return updateListSong;
                }
                return {
                    status: 200,
                    success: true,
                    message: 'UPDATE_GENRE_SUCCESSFULLY',
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'UPDATE_GENRE_FAILED',
                };
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const genres = yield index_instance_1.genreModel.getAll();
                return {
                    status: 200,
                    success: true,
                    message: 'GET_ALL_GENRE_SUCCESSFULLY',
                    data: genres,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_ALL_GENRE_FAILED',
                    errors: error,
                };
            }
        });
    }
    getTop4Item(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const genres = yield index_instance_1.genreModel.getTopGenre(item);
                return {
                    status: 200,
                    success: true,
                    message: 'GET_ALL_GENRE_SUCCESSFULLY',
                    data: genres,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_ALL_GENRE_FAILED',
                    errors: error,
                };
            }
        });
    }
    getTopListSong() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const genres = yield index_instance_1.genreModel.getTopListSong();
                return {
                    status: 200,
                    success: true,
                    message: 'GET_TOP_GENRE_SUCCESSFULLY',
                    data: genres,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_TOP_GENRE_FAILED',
                    errors: error,
                };
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const genres = yield index_instance_1.genreModel.getByIdPopulate(id);
                if (!genres)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST',
                    };
                return {
                    status: 200,
                    success: true,
                    message: 'GET_GENRE_BY_ID_SUCCESSFULLY',
                    data: genres,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_GENRE_BY_ID_FAILED',
                    errors: error,
                };
            }
        });
    }
    updateBySongEventUpdate(listGenreId, songId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listGenreBySongId = yield index_instance_1.genreModel.getMultipleBySongReference(listGenreId, songId);
                const mapping = listGenreBySongId.map((genre) => genre._id);
                const filterIdNotPercent = listGenreId.filter((genreId) => mapping.indexOf(genreId) === -1);
                if (filterIdNotPercent.length) {
                    yield index_instance_1.genreModel.updateManyActionSongReference(filterIdNotPercent, songId, action_enum_1.EnumActionUpdate.PUSH);
                }
                else {
                    const listAllById = (yield index_instance_1.genreModel.getListBySongId(songId)).map((genre) => genre._id);
                    const listPullListSong = listAllById.filter((albumId) => listGenreId.indexOf(albumId) === -1);
                    if (listPullListSong.length)
                        yield index_instance_1.genreModel.updateManyActionSongReference(listPullListSong, songId, action_enum_1.EnumActionUpdate.REMOVE);
                }
                return {
                    status: 200,
                    success: true,
                    message: 'UPDATE_GENRE_SUCCESSFULLY',
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'UPDATE_GENRE_FAILED',
                    errors: error,
                };
            }
        });
    }
}
exports.default = GenreService;
//# sourceMappingURL=genre.service.js.map