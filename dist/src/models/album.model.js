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
const action_enum_1 = require("../constraints/enums/action.enum");
const album_schema_1 = __importDefault(require("../database/schemas/album.schema"));
class AlbumModel {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const album = yield album_schema_1.default.find();
            return album;
        });
    }
    getByComposerAndTitle(idComposer, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const albumByComposer = yield album_schema_1.default.findOne({
                userReference: idComposer,
                title: { $regex: title, $options: 'i' },
            });
            return albumByComposer;
        });
    }
    getListId(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const album = yield album_schema_1.default.find({
                _id,
            });
            return album;
        });
    }
    getListBySongId(songId) {
        return __awaiter(this, void 0, void 0, function* () {
            const album = yield album_schema_1.default.find({
                listSong: songId,
            });
            return album;
        });
    }
    getBySongReference(_id, songReference) {
        return __awaiter(this, void 0, void 0, function* () {
            const album = yield album_schema_1.default.findOne({
                _id,
                listSong: songReference,
            });
            return album;
        });
    }
    getMultipleBySongReference(_id, songReference) {
        return __awaiter(this, void 0, void 0, function* () {
            const albums = yield album_schema_1.default
                .find({ _id })
                .where('listSong')
                .equals(songReference);
            return albums;
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const album = yield album_schema_1.default.findById(_id);
            return album;
        });
    }
    getByIdPopulate(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const album = yield album_schema_1.default.findById(_id)
                .populate({
                path: "listSong",
                strictPopulate: true,
                select: 'title thumbnailUrl publish performers',
                populate: ({
                    path: "performers",
                    strictPopulate: true,
                    select: 'name nickname'
                })
            }).populate({
                path: "userReference",
                strictPopulate: true,
                select: 'name avatarUrl songsReference',
                populate: ({
                    path: "songsReference",
                    strictPopulate: true,
                    select: 'title'
                })
            });
            return album;
        });
    }
    search(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const albumQuery = album_schema_1.default.find({
                $or: [
                    { title: { $regex: title, $options: 'i' } }
                ]
            }).select('title thumbnailUrl');
            return albumQuery;
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield album_schema_1.default.create(payload);
            return created;
        });
    }
    updateManyActionSongReference(_id, songReference, options) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (options) {
                case action_enum_1.EnumActionUpdate.REMOVE:
                    const removeUpdated = yield album_schema_1.default.updateMany({
                        _id: { $in: _id },
                    }, {
                        $pull: { listSong: { $in: songReference } },
                    });
                    return removeUpdated;
                case action_enum_1.EnumActionUpdate.PUSH:
                    const pushUpdated = yield album_schema_1.default.updateMany({
                        _id: { $in: _id },
                    }, {
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
            const updatedField = yield album_schema_1.default.findByIdAndUpdate(id, {
                $set: {
                    title: payload.title,
                    publish: payload.publish,
                    information: payload.information,
                    userReference: payload.userReference,
                    thumbnail: payload.thumbnail,
                    thumbnailUrl: payload.thumbnailUrl,
                    updatedAt: payload.updatedAt,
                    listSong: payload.listSong,
                },
            }, { new: true });
            return updatedField;
        });
    }
    updatedFieldByActionRemove(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedField = yield album_schema_1.default.findByIdAndUpdate(id, {
                $set: {
                    title: payload.title,
                    publish: payload.publish,
                    information: payload.information,
                    userReference: payload.userReference,
                    thumbnail: payload.thumbnail,
                    thumbnailUrl: payload.thumbnailUrl,
                    updatedAt: payload.updatedAt,
                },
                $pull: { listSong: payload.listSong },
            }, { new: true });
            return updatedField;
        });
    }
    updateMultiAlbumListSong(listId, songId) {
        return __awaiter(this, void 0, void 0, function* () {
            // return await albumSchema.find({ _id: listId }, {  })
        });
    }
    updateDetachListSong(songReference) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield album_schema_1.default.updateMany({
                $pull: { listSong: songReference },
            }, { new: true });
        });
    }
    getAlbumNewWeek(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const albumNew = yield album_schema_1.default
                .find({
                updatedAt: {
                    $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                },
            }).limit(item)
                .populate({
                path: 'userReference',
                strictPopulate: true,
                select: 'name nickname avatar',
            });
            return albumNew;
        });
    }
}
exports.default = AlbumModel;
//# sourceMappingURL=album.model.js.map