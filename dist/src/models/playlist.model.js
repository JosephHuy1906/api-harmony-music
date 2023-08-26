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
const playlist_schema_1 = __importDefault(require("@/database/schemas/playlist.schema"));
class PlaylistModel {
    getByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield playlist_schema_1.default.findOne({ title }).populate({
                path: 'listSong',
                strictPopulate: true,
                select: 'title thumbnail performers',
                populate: {
                    path: 'performers',
                    strictPopulate: true,
                    select: 'name nickname',
                },
            });
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield playlist_schema_1.default.findById(_id);
        });
    }
    getByIdPopulate(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield playlist_schema_1.default.findById(_id).populate({
                path: 'listSong',
                strictPopulate: true,
                select: 'title thumbnail performers',
                populate: {
                    path: 'performers',
                    strictPopulate: true,
                    select: 'name nickname',
                },
            });
        });
    }
    getListByUserIdPopulate(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield playlist_schema_1.default.find({ userReference: userId }).populate({
                path: 'listSong',
                strictPopulate: true,
                select: 'title thumbnail performers',
                populate: {
                    path: 'performers',
                    strictPopulate: true,
                    select: 'name nickname',
                },
            });
        });
    }
    updateDetachListSong(songReference) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield playlist_schema_1.default.updateMany({
                $pull: { listSong: songReference },
            }, { new: true });
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield playlist_schema_1.default.create(payload);
        });
    }
    updateByAction(_id, payload, typeAction) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (typeAction) {
                case action_enum_1.EnumActionUpdate.PUSH:
                    return yield playlist_schema_1.default.findByIdAndUpdate(_id, {
                        $set: { title: payload.title },
                        $push: { listSong: payload.songId },
                    }, { new: true });
                case action_enum_1.EnumActionUpdate.REMOVE:
                    return yield playlist_schema_1.default.findByIdAndUpdate(_id, {
                        $set: { title: payload.title },
                        $pull: { listSong: payload.songId },
                    }, { new: true });
                default:
                    return null;
            }
        });
    }
    forceDelete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield playlist_schema_1.default.findByIdAndDelete(_id);
        });
    }
}
exports.default = PlaylistModel;
//# sourceMappingURL=playlist.model.js.map