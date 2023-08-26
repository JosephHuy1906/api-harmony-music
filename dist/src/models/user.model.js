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
const role_enum_1 = require("../constraints/enums/role.enum");
const user_schema_1 = __importDefault(require("../database/schemas/user.schema"));
class UserModel {
    getAllByUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_schema_1.default.find({ role: role_enum_1.RoleConstant.USER });
            return user;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_schema_1.default.find();
            return user;
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_schema_1.default.findById(_id);
            return user;
        });
    }
    getAllByComposer() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_schema_1.default.find({ role: role_enum_1.RoleConstant.COMPOSER }).select('_id name role');
            return user;
        });
    }
    getByIdPopulate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_schema_1.default.findById(id)
                .select('role albumsReference avatarUrl email name locale nickname playlistReference songsReference favoriteListReference historyReference playlistReference')
                .populate({
                path: 'songsReference',
                strictPopulate: true,
                select: '_id title publish thumbnailUrl albumReference performers genresReference ',
                populate: [
                    {
                        path: 'albumReference',
                        strictPopulate: true,
                    },
                    {
                        path: 'performers',
                        strictPopulate: true,
                        select: 'name nickname'
                    },
                    {
                        path: 'genresReference',
                        strictPopulate: true,
                        select: 'title'
                    }
                ]
            })
                .populate({
                path: 'favoriteListReference',
                strictPopulate: true,
                populate: {
                    path: 'listSong',
                    model: 'song'
                }
            }).populate({
                path: 'historyReference',
                strictPopulate: true,
                populate: {
                    path: 'listSong',
                    model: 'song'
                }
            }).populate({
                path: 'playlistReference',
                strictPopulate: true,
            }).populate({
                path: 'albumsReference',
                strictPopulate: true,
            });
            return user;
        });
    }
    getByNickNamePopulate(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_schema_1.default.findOne({ nickname: nickname }).select('albumsReference nickname name songsReference avatarUrl')
                .populate({
                path: 'songsReference',
                strictPopulate: true,
                select: '_id title publish thumbnailUrl albumReference performers',
                populate: [
                    {
                        path: 'albumReference',
                        strictPopulate: true,
                    },
                    {
                        path: 'performers',
                        strictPopulate: true,
                        select: 'name nickname'
                    }
                ]
            }).populate({
                path: 'albumsReference',
                strictPopulate: true,
            });
            return user;
        });
    }
    search(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchUser = user_schema_1.default.find({
                $and: [
                    { role: 'composer' },
                    {
                        $or: [
                            { name: { $regex: title, $options: 'i' } },
                        ]
                    }
                ]
            }).select('name avatarUrl nickname');
            return searchUser;
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_schema_1.default.findOne({ email });
            return user;
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield user_schema_1.default.create(payload);
            return created;
        });
    }
    updateById(_id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield user_schema_1.default.findByIdAndUpdate(_id, payload, {
                new: true,
            });
            return updated;
        });
    }
    updateIncreaseSongReferenceById(userId, songReference) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_schema_1.default.findByIdAndUpdate({ _id: userId }, {
                $push: { songsReference: songReference },
            }, { new: true });
        });
    }
    updateDetachListSong(songReference) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_schema_1.default.updateMany({
                $pull: { songsReference: songReference },
            }, { new: true });
        });
    }
    updateIncreaseAlbum(_id, albumId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_schema_1.default.findOneAndUpdate({ _id }, {
                $push: { albumsReference: albumId },
            }, { new: true });
        });
    }
}
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map