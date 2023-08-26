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
const song_schema_1 = __importDefault(require("@/database/schemas/song.schema"));
class SongModel {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const songs = yield song_schema_1.default
                .find()
                .populate({
                path: 'userReference',
                strictPopulate: true,
                select: 'name slug',
            })
                .populate({
                path: 'albumReference',
                strictPopulate: true,
                select: 'title',
            })
                .populate({
                path: 'genresReference',
                strictPopulate: true,
                select: 'title',
            })
                .populate({
                path: 'performers',
                strictPopulate: true,
                select: 'name slug',
            });
            return songs;
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const song = yield song_schema_1.default
                .findById(_id)
                .populate({
                path: 'userReference',
                strictPopulate: true,
                select: 'name slug',
            })
                .populate({
                path: 'albumReference',
                strictPopulate: true,
                select: 'title',
            })
                .populate({
                path: 'genresReference',
                strictPopulate: true,
                select: 'title',
            })
                .populate({
                path: 'performers',
                strictPopulate: true,
                select: 'name slug',
            });
            return song;
        });
    }
    getSongJustReleasedPopulate(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield song_schema_1.default.countDocuments({
                createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 14)) }
            });
            const random = Math.floor(Math.random() * count);
            const songs = yield song_schema_1.default.find({
                createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 14)) }
            }).skip(random).limit(item)
                .populate({
                path: 'userReference',
                strictPopulate: true,
                select: 'name nickname thumbnailUrl',
            })
                .populate({
                path: 'albumReference',
                strictPopulate: true,
                select: 'title',
            })
                .populate({
                path: 'genresReference',
                strictPopulate: true,
                select: 'title',
            })
                .populate({
                path: 'performers',
                strictPopulate: true,
                select: 'name nickname thumbnailUrl',
            });
            return songs;
        });
    }
    getSongTopView(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const songs = yield song_schema_1.default
                .find({}).sort({ views: -1 }).limit(id)
                .populate({
                path: 'userReference',
                strictPopulate: true,
                select: 'name nickname thumbnailUrl',
            })
                .populate({
                path: 'albumReference',
                strictPopulate: true,
                select: 'title',
            })
                .populate({
                path: 'genresReference',
                strictPopulate: true,
                select: 'title',
            }).populate({
                path: 'performers',
                strictPopulate: true,
                select: 'name nickname thumbnailUrl',
            });
            return songs;
        });
    }
    search(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const songQuery = song_schema_1.default.find({
                $or: [
                    { title: { $regex: title, $options: 'i' } },
                ]
            }).select('title thumbnailUrl performers')
                .populate({
                path: 'performers',
                strictPopulate: true,
                select: 'name nickname thumbnailUrl',
            });
            return songQuery;
        });
    }
    getByArrayId(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const songs = yield song_schema_1.default.find({ _id });
            return songs;
        });
    }
    getByIdNoPopulate(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const song = yield song_schema_1.default.findById(_id);
            return song;
        });
    }
    getByIdSelectSongPathReference(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const song = yield song_schema_1.default.findById(_id).select('songPathReference');
            return song;
        });
    }
    getMultipleByAlbumReference(_id, albumReference) {
        return __awaiter(this, void 0, void 0, function* () {
            const songs = yield song_schema_1.default
                .find({ _id })
                .where('albumReference')
                .equals(albumReference);
            return songs;
        });
    }
    getMultipleByGenreReference(_id, genresReference) {
        return __awaiter(this, void 0, void 0, function* () {
            const songs = yield song_schema_1.default
                .find({ _id })
                .where('genresReference')
                .equals(genresReference);
            return songs;
        });
    }
    getListByAlbumReference(albumReference) {
        return __awaiter(this, void 0, void 0, function* () {
            const songs = yield song_schema_1.default.find({
                albumReference: albumReference,
            });
            return songs;
        });
    }
    getListByGenreReference(genreReference) {
        return __awaiter(this, void 0, void 0, function* () {
            const songs = yield song_schema_1.default.find({
                genresReference: genreReference,
            });
            return songs;
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield song_schema_1.default.create(payload);
            return created;
        });
    }
    updateField(_id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedField = yield song_schema_1.default.findByIdAndUpdate(_id, {
                $set: {
                    title: payload.title,
                    publish: payload.publish,
                    albumReference: payload.albumReference,
                    genresReference: payload.genresReference,
                    performers: payload.performers,
                    updatedAt: new Date().toUTCString(),
                },
            }, {
                new: true,
            });
            return updatedField;
        });
    }
    updateByAction(listId, payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (options) {
                case action_enum_1.EnumActionUpdate.PUSH:
                    const pushUpdated = yield song_schema_1.default.updateMany({
                        _id: { $in: listId },
                    }, {
                        $set: {
                            title: payload.title,
                            publish: payload.publish,
                            performers: payload.performers,
                            updatedAt: new Date().toUTCString(),
                        },
                        $push: {
                            albumReference: payload.albumReference,
                            genresReference: payload.genresReference,
                        },
                    });
                    return pushUpdated;
                case action_enum_1.EnumActionUpdate.REMOVE:
                    const removeUpdated = yield song_schema_1.default.updateMany({
                        _id: { $in: listId },
                    }, {
                        $set: {
                            title: payload.title,
                            publish: payload.publish,
                            performers: payload.performers,
                            updatedAt: new Date().toUTCString(),
                        },
                        $pull: {
                            albumReference: { $in: payload.albumReference },
                            genresReference: { $in: payload.genresReference },
                        },
                    });
                    return removeUpdated;
                default:
                    throw new Error('Action not supported');
            }
        });
    }
    updateIncreaseAlbumReference(listId, albumId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield song_schema_1.default.updateMany({ _id: listId }, {
                $push: { albumReference: albumId },
            }, { new: true });
        });
    }
    updateThumbnailById(_id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield song_schema_1.default.findByIdAndUpdate(_id, {
                $set: {
                    thumbnail: payload.thumbnail,
                },
            }, { new: true });
        });
    }
    increaseView(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield song_schema_1.default.findByIdAndUpdate(_id, {
                $inc: { views: 1 },
            });
        });
    }
    forceDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const forceDelete = yield song_schema_1.default.findByIdAndDelete(id);
            return forceDelete;
        });
    }
}
exports.default = SongModel;
//# sourceMappingURL=song.model.js.map