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
const songDraft_schema_1 = __importDefault(require("../database/schemas/songDraft.schema"));
class SongDraftModel {
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield songDraft_schema_1.default.findById(_id);
        });
    }
    getUserId(userReference) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield songDraft_schema_1.default.findOne({ userReference: userReference });
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield songDraft_schema_1.default.create(payload);
        });
    }
    updateField(_id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield songDraft_schema_1.default.findByIdAndUpdate(_id, {
                $set: {
                    'audio.bucketName': payload.audio
                        ? payload.audio.bucketName
                        : undefined,
                    'audio.keyObject': payload.audio
                        ? payload.audio.keyObject
                        : undefined,
                    'audio.contentType': payload.audio
                        ? payload.audio.contentType
                        : undefined,
                    'audio.expiredTime': payload.audio
                        ? payload.audio.expiredTime
                        : undefined,
                    thumbnail: {
                        bucketName: payload.thumbnail
                            ? payload.thumbnail.bucketName
                            : undefined,
                        keyObject: payload.thumbnail
                            ? payload.thumbnail.keyObject
                            : undefined,
                        contentType: payload.thumbnail
                            ? payload.thumbnail.contentType
                            : undefined,
                        expiredTime: payload.thumbnail
                            ? payload.thumbnail.expiredTime
                            : undefined,
                    },
                    updatedAt: new Date().toUTCString(),
                },
            }, {
                new: true,
            });
        });
    }
    forceDelete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield songDraft_schema_1.default.findByIdAndDelete(_id);
        });
    }
}
exports.default = SongDraftModel;
// ngày mai sẽ làm phần tiếp theo của s3:
//  + update một song thì update field trong collection song. -> done
//  + delete ở trên s3 đồng thời cũng delete trên db; -> thiếu phần playlist
//  + create song thì cũng phải thêm id vào listSong những collection liên quan
//  + get song thì trả về json
//  + get stream thì trả về pipe stream
//  + get thumbnail thì gọi lên api server, server sẽ gọi lên s3, xong lấy
//  + thiếu playlist module
//  file content đọc và trả về bằng res.pipe
//# sourceMappingURL=songDraft.model.js.map