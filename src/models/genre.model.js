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
const action_enum_1 = require("@/constraints/enums/action.enum");
const genre_schema_1 = __importDefault(require("@/database/schemas/genre.schema"));
class GenreModel {
    getByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const genreByTitle = yield genre_schema_1.default.findOne({
                title: { $regex: title, $options: 'i' },
            });
            return genreByTitle;
        });
    }
    getAllPopulate(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield genre_schema_1.default.find().limit(item);
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield genre_schema_1.default.findById(_id);
        });
    }
    getMultipleBySongReference(_id, songReference) {
        return __awaiter(this, void 0, void 0, function* () {
            const albums = yield genre_schema_1.default
                .find({ _id })
                .where('listSong')
                .equals(songReference);
            return albums;
        });
    }
    getListId(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const genre = yield genre_schema_1.default.find({
                _id,
            });
            return genre;
        });
    }
    getTopListSong() {
        return __awaiter(this, void 0, void 0, function* () {
            const genres = yield genre_schema_1.default.find().sort({ listSong: -1 })
                .limit(4);
            return genres;
        });
    }
    getListBySongId(songId) {
        return __awaiter(this, void 0, void 0, function* () {
            const genres = yield genre_schema_1.default.find({
                listSong: songId,
            });
            return genres;
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield genre_schema_1.default.create(payload);
            return created;
        });
    }
    updateManyActionSongReference(_id, songReference, options) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (options) {
                case action_enum_1.EnumActionUpdate.REMOVE:
                    const removeUpdated = yield genre_schema_1.default
                        .find({ _id })
                        .updateMany({
                        $set: { updatedAt: new Date().toISOString() },
                        $pull: { listSong: songReference },
                    });
                    return removeUpdated;
                case action_enum_1.EnumActionUpdate.PUSH:
                    const pushUpdated = yield genre_schema_1.default.find({ _id }).updateMany({
                        $set: { updatedAt: new Date().toISOString() },
                        $push: { listSong: songReference },
                    });
                    return pushUpdated;
                default:
                    throw new Error('INVALID ACTION TYPE UPDATE');
            }
        });
    }
    updatedField(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedField = yield genre_schema_1.default.findByIdAndUpdate(id, {
                $set: {
                    title: payload.title,
                    listSong: payload.listSong,
                    updatedAt: new Date().toUTCString(),
                },
            });
            return updatedField;
        });
    }
    updatedPullField(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedField = yield genre_schema_1.default.findByIdAndUpdate(id, {
                $set: {
                    title: payload.title,
                    updatedAt: new Date().toUTCString(),
                },
                $pull: { listSong: payload.listSong },
            });
            return updatedField;
        });
    }
    updateDetachListSong(songReference) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield genre_schema_1.default.updateMany({
                $pull: { listSong: songReference },
            }, { new: true });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const genres = genre_schema_1.default.find().populate({
                path: 'listSong',
                strictPopulate: true,
                select: 'title thumbnail performers',
                populate: ({
                    path: 'performers',
                    strictPopulate: true,
                    select: 'name nickname avatarUrl',
                })
            });
            return genres;
        });
    }
    getTopGenre(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const genres = genre_schema_1.default.find().sort({ 'listSong.0': -1 }).limit(item)
                .populate({
                path: 'listSong',
                strictPopulate: true,
                select: 'title thumbnailUrl performers',
                populate: ({
                    path: 'performers',
                    strictPopulate: true,
                    select: 'name nickname avatarUrl',
                })
            });
            return genres;
        });
    }
    getByIdPopulate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const genres = genre_schema_1.default.findById(id)
                .populate({
                path: 'listSong',
                strictPopulate: true,
                select: 'title thumbnailUrl performers albumReference',
                populate: [
                    {
                        path: 'performers',
                        strictPopulate: true,
                        select: 'name nickname avatarUrl',
                    },
                    {
                        path: 'albumReference',
                        strictPopulate: true,
                        select: 'title',
                    },
                ],
            });
            return genres;
        });
    }
}
exports.default = GenreModel;
//# sourceMappingURL=genre.model.js.map