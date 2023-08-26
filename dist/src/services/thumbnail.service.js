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
const sharp_1 = __importDefault(require("sharp"));
const s3_enum_1 = require("@/constraints/enums/s3.enum");
const index_instance_1 = require("@/instances/index.instance");
class ThumbnailService {
    constructor() { }
    getThumbnailSong(slugId, resize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentSong = yield index_instance_1.songModel.getById(slugId);
                if (!currentSong)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST_GET_THUMBNAIL',
                    };
                const fileContent = yield index_instance_1.s3Service.getFileContentS3(currentSong.thumbnail);
                const { data } = fileContent;
                if (!data || !data.Body)
                    throw new Error('GET_FILE_THUMBNAIL_FAILED');
                const bufferData = yield this.streamToBuffer(data.Body);
                const translateThumbnail = yield this.translateThumbnailFromS3(bufferData, s3_enum_1.EContentTypeObjectS3.JPEG, resize);
                return {
                    status: 200,
                    success: true,
                    message: 'GET_THUMBNAIL_SUCCESSFULLY',
                    data: translateThumbnail,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_THUMBNAIL_FAILED',
                    errors: error,
                };
            }
        });
    }
    getThumbnailAlbum(slugId, resize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentAlbum = yield index_instance_1.albumModel.getById(slugId);
                if (!currentAlbum || currentAlbum.thumbnail === null)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST_GET_THUMBNAIL',
                    };
                const fileContent = yield index_instance_1.s3Service.getFileContentS3(currentAlbum.thumbnail);
                const { data } = fileContent;
                if (!data || !data.Body)
                    throw new Error('GET_FILE_THUMBNAIL_FAILED');
                const bufferData = yield this.streamToBuffer(data.Body);
                const translateThumbnail = yield this.translateThumbnailFromS3(bufferData, s3_enum_1.EContentTypeObjectS3.JPEG, resize);
                return {
                    status: 200,
                    success: true,
                    message: 'GET_THUMBNAIL_SUCCESSFULLY',
                    data: translateThumbnail,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_THUMBNAIL_FAILED',
                    errors: error,
                };
            }
        });
    }
    getThumbnailUserAvatar(slugId, resize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = yield index_instance_1.userModel.getById(slugId);
                if (!currentUser || currentUser.avatarS3 === null)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST_GET_THUMBNAIL',
                    };
                const fileContent = yield index_instance_1.s3Service.getFileContentS3(currentUser.avatarS3);
                const { data } = fileContent;
                if (!data || !data.Body)
                    throw new Error('GET_FILE_THUMBNAIL_FAILED');
                const bufferData = yield this.streamToBuffer(data.Body);
                const translateThumbnail = yield this.translateThumbnailFromS3(bufferData, s3_enum_1.EContentTypeObjectS3.JPEG, resize);
                return {
                    status: 200,
                    success: true,
                    message: 'GET_THUMBNAIL_SUCCESSFULLY',
                    data: translateThumbnail,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_THUMBNAIL_FAILED',
                    errors: error,
                };
            }
        });
    }
    translateThumbnailFromS3(path, outputExtensionsFile, resize) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (resize) {
                    (0, sharp_1.default)(path)
                        .toFormat(outputExtensionsFile)
                        .resize(Number.parseInt(resize.split('x')[0]), Number.parseInt(resize.split('x')[1]))
                        .toBuffer((err, data) => {
                        if (err)
                            reject(err);
                        resolve(data);
                    });
                }
                else {
                    (0, sharp_1.default)(path)
                        .toFormat(outputExtensionsFile)
                        .toBuffer((err, data) => {
                        if (err)
                            reject(err);
                        resolve(data);
                    });
                }
            });
        });
    }
    streamToBuffer(stream) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const chunks = [];
                stream.on('data', (chunk) => {
                    chunks.push(Buffer.from(chunk));
                });
                stream.on('end', () => {
                    resolve(Buffer.concat(chunks));
                });
                stream.on('error', (error) => {
                    reject(error);
                });
            });
        });
    }
}
exports.default = ThumbnailService;
//# sourceMappingURL=thumbnail.service.js.map