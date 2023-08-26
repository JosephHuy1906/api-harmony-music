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
const favorite_schema_1 = __importDefault(require("../database/schemas/favorite.schema"));
class FavoriteModel {
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const favorite = yield favorite_schema_1.default.findById(_id);
            return favorite;
        });
    }
    getByIdPoPulate(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const favorite = yield favorite_schema_1.default.findById(_id).populate({
                path: 'listSong',
                strictPopulate: true,
                select: 'title thumbnail performers',
                populate: ({
                    path: 'performers',
                    strictPopulate: true,
                    select: 'name nickname'
                })
            });
            return favorite;
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const create = yield favorite_schema_1.default.create(payload);
            return create;
        });
    }
    updateByAction(_id, songId, action) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (action) {
                case action_enum_1.EnumActionUpdate.PUSH:
                    const updateActionPush = yield favorite_schema_1.default.findByIdAndUpdate(_id, {
                        $set: { updatedAt: new Date().toUTCString() },
                        $push: { listSong: songId },
                    }, {
                        new: true,
                    });
                    return updateActionPush;
                case action_enum_1.EnumActionUpdate.REMOVE:
                    const updateActionPull = yield favorite_schema_1.default.findByIdAndUpdate(_id, {
                        $set: { updatedAt: new Date().toUTCString() },
                        $pull: { listSong: { $in: songId } },
                    }, {
                        new: true,
                    });
                    return updateActionPull;
                default:
                    throw new Error('INVALID ACTION UPDATE HISTORY');
            }
        });
    }
    updateDetachListSong(songReference) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield favorite_schema_1.default.updateMany({
                $pull: { listSong: songReference },
            }, { new: true });
        });
    }
    forceDelete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const forceDelete = yield favorite_schema_1.default.findByIdAndDelete(_id);
            return forceDelete;
        });
    }
}
exports.default = FavoriteModel;
//# sourceMappingURL=favorite.model.js.map