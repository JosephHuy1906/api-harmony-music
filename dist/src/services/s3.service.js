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
const s3_config_1 = __importDefault(require("../configs/s3.config"));
const s3_enum_1 = require("../constraints/enums/s3.enum");
const index_instance_1 = require("../instances/index.instance");
const generateRandomKey_util_1 = __importDefault(require("../utils/generateRandomKey.util"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const uuid_1 = require("uuid");
class S3Service {
    constructor() {
        this.expiredTime = 3000; // default 5 minutes
    }
    getFileContentS3(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const command = new client_s3_1.GetObjectCommand({
                    Bucket: instance.bucketName,
                    Key: instance.keyObject,
                    Range: instance.range,
                });
                const response = yield s3_config_1.default.send(command);
                if (response && !response.Body)
                    throw new Error('CAN_NOT_GET_FILE_S3');
                return {
                    status: 200,
                    success: true,
                    message: 'FILE_CONTENT_S3_SUCCESSFULLY',
                    data: response,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_FILE_CONTENT_S3_FAILED',
                    errors: error,
                };
            }
        });
    }
    getSignUrlForUploadAudioS3(userId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST',
                    };
                const keyObjectAudio = `${(0, generateRandomKey_util_1.default)(30)}.${s3_enum_1.EContentTypeObjectS3.AUDIO_EXTENSION}`;
                const command = new client_s3_1.PutObjectCommand({
                    Bucket: (_a = process.env.AWS_S3_BUCKET_AUDIO_NAME) !== null && _a !== void 0 ? _a : '',
                    Key: keyObjectAudio,
                    ContentType: s3_enum_1.EContentTypeObjectS3.AUDIO,
                });
                const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3_config_1.default, command, {
                    expiresIn: this.expiredTime,
                });
                const newSongDraftInstance = yield index_instance_1.songDraftModel.create({
                    _id: (0, uuid_1.v4)(),
                    audio: {
                        bucketName: (_b = process.env.AWS_S3_BUCKET_AUDIO_NAME) !== null && _b !== void 0 ? _b : '',
                        keyObject: keyObjectAudio,
                        contentType: s3_enum_1.EContentTypeObjectS3.AUDIO,
                        expiredTime: this.expiredTime,
                    },
                    thumbnail: null,
                    userReference: userId,
                });
                return {
                    status: 200,
                    success: true,
                    message: 'GET_SIGNED_URL_FOR_UPLOAD_AUDIO_SUCCESSFULLY',
                    data: {
                        uploadId: newSongDraftInstance._id,
                        privateUrl: url,
                        expired: this.expiredTime,
                        contentType: newSongDraftInstance.audio.contentType,
                        keyObjectAudio: newSongDraftInstance.audio.keyObject,
                        userId,
                    },
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_SIGNED_URL_FOR_UPLOAD_AUDIO_FAILED',
                    errors: error,
                };
            }
        });
    }
    getSignUrlForUploadThumbnailS3(userId, uploadId, contentType) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentSongDraft = yield index_instance_1.songDraftModel.getById(uploadId);
                if (!userId || !currentSongDraft)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST',
                    };
                const keyObjectThumbnail = `${s3_enum_1.EKeyObjectS3Thumbnail.SONG}/${(0, generateRandomKey_util_1.default)(30)}.${contentType}`;
                const command = new client_s3_1.PutObjectCommand({
                    Bucket: (_a = process.env.AWS_S3_BUCKET_IMAGES) !== null && _a !== void 0 ? _a : '',
                    Key: keyObjectThumbnail,
                    ContentType: contentType,
                });
                const updateSongDraft = yield index_instance_1.songDraftModel.updateField(currentSongDraft._id, {
                    thumbnail: {
                        bucketName: (_b = process.env.AWS_S3_BUCKET_IMAGES) !== null && _b !== void 0 ? _b : '',
                        keyObject: keyObjectThumbnail,
                        contentType,
                        expiredTime: this.expiredTime,
                    },
                });
                if (!updateSongDraft)
                    throw new Error('CAN_NOT_UPDATE_SONG_DRAFT');
                const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3_config_1.default, command, {
                    expiresIn: this.expiredTime,
                });
                return {
                    status: 200,
                    success: true,
                    message: 'GET_SIGNED_URL_FOR_UPLOAD_THUMBNAIL_SUCCESSFULLY',
                    data: {
                        uploadId: updateSongDraft._id,
                        privateUrl: url,
                        expired: this.expiredTime,
                        contentType: updateSongDraft.thumbnail.contentType,
                        keyObjectThumbnail: updateSongDraft.thumbnail.keyObject,
                        userId,
                    },
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_SIGNED_URL_FOR_UPLOAD_THUMBNAIL_FAILED',
                    errors: error,
                };
            }
        });
    }
    deleteFileOnS3(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const command = new client_s3_1.DeleteObjectCommand({
                    Bucket: instance.bucketName,
                    Key: instance.keyObject,
                });
                const response = yield s3_config_1.default.send(command);
                return {
                    status: 200,
                    success: true,
                    message: 'DELETE_FILE_S3_SUCCESSFULLY',
                    data: response,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'DELETE_FILE_S3_FAILED',
                    errors: error,
                };
            }
        });
    }
    getSignUrlForUploadAlbum(userId, albumId, contentType) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentAlbum = yield index_instance_1.albumModel.getById(albumId);
                if (!currentAlbum ||
                    (currentAlbum && currentAlbum.userReference !== userId))
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST_UPLOAD',
                    };
                const keyObjectAlbum = `${s3_enum_1.EKeyObjectS3Thumbnail.ALBUM}/${(0, generateRandomKey_util_1.default)(30)}.${contentType}`;
                const command = new client_s3_1.PutObjectCommand({
                    Bucket: (_a = process.env.AWS_S3_BUCKET_IMAGES) !== null && _a !== void 0 ? _a : '',
                    Key: keyObjectAlbum,
                    ContentType: contentType,
                });
                if (currentAlbum.thumbnail) {
                    const deleteFileExist = yield this.deleteFileOnS3(currentAlbum.thumbnail);
                    if (!deleteFileExist.success)
                        return deleteFileExist;
                }
                const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3_config_1.default, command, {
                    expiresIn: this.expiredTime,
                });
                yield index_instance_1.albumModel.updatedField(currentAlbum._id, {
                    thumbnail: {
                        bucketName: (_b = process.env.AWS_S3_BUCKET_IMAGES) !== null && _b !== void 0 ? _b : '',
                        keyObject: keyObjectAlbum,
                        contentType,
                    },
                    thumbnailUrl: `${process.env.SERVER_URL}:${process.env.PORT_SERVER}/api/v1/thumbnail/album/${currentAlbum._id}`,
                });
                return {
                    status: 200,
                    success: true,
                    message: 'UPLOAD_FILE_SUCCESSFULLY',
                    data: {
                        privateUrl: url,
                        expired: this.expiredTime,
                        contentType,
                        keyObjectAlbum,
                        albumId,
                        userId,
                    },
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'UPLOAD_FILE_FAILED',
                    errors: error,
                };
            }
        });
    }
    getSignUrlForUploadUserAvatar(userId, contentType) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = yield index_instance_1.userModel.getById(userId);
                if (!currentUser)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST_UPLOAD',
                    };
                const keyObjectUserAvatar = `${s3_enum_1.EKeyObjectS3Thumbnail.AVATAR}/${(0, generateRandomKey_util_1.default)(30)}.${contentType}`;
                const command = new client_s3_1.PutObjectCommand({
                    Bucket: (_a = process.env.AWS_S3_BUCKET_IMAGES) !== null && _a !== void 0 ? _a : '',
                    Key: keyObjectUserAvatar,
                    ContentType: contentType,
                });
                if (currentUser.avatarS3) {
                    const deleteFileExist = yield this.deleteFileOnS3(currentUser.avatarS3);
                    if (!deleteFileExist.success)
                        return deleteFileExist;
                }
                const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3_config_1.default, command, {
                    expiresIn: this.expiredTime,
                });
                yield index_instance_1.userModel.updateById(currentUser._id, {
                    avatarS3: {
                        bucketName: (_b = process.env.AWS_S3_BUCKET_IMAGES) !== null && _b !== void 0 ? _b : '',
                        keyObject: keyObjectUserAvatar,
                        contentType,
                    },
                    avatarUrl: `${process.env.SERVER_URL}:${process.env.PORT_SERVER}/api/v1/thumbnail/avatar/${currentUser._id}`,
                });
                return {
                    status: 200,
                    success: true,
                    message: 'UPLOAD_FILE_SUCCESSFULLY',
                    data: {
                        privateUrl: url,
                        expired: this.expiredTime,
                        contentType,
                        keyObjectUserAvatar,
                        userId,
                    },
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'UPLOAD_FILE_FAILED',
                    errors: error,
                };
            }
        });
    }
    getSignUrlForUploadThumbnailSong(songId, contentType) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentSong = yield index_instance_1.songModel.getById(songId);
                if (!currentSong)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST_UPLOAD',
                    };
                const keyObjectThumbnail = `${s3_enum_1.EKeyObjectS3Thumbnail.SONG}/${(0, generateRandomKey_util_1.default)(30)}.${contentType}`;
                const command = new client_s3_1.PutObjectCommand({
                    Bucket: (_a = process.env.AWS_S3_BUCKET_IMAGES) !== null && _a !== void 0 ? _a : '',
                    Key: keyObjectThumbnail,
                    ContentType: contentType,
                });
                if (currentSong.thumbnail) {
                    const deleteFileExist = yield this.deleteFileOnS3(currentSong.thumbnail);
                    if (!deleteFileExist.success)
                        return deleteFileExist;
                }
                const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3_config_1.default, command, {
                    expiresIn: this.expiredTime,
                });
                yield index_instance_1.songModel.updateThumbnailById(currentSong._id, {
                    thumbnail: {
                        bucketName: (_b = process.env.AWS_S3_BUCKET_IMAGES) !== null && _b !== void 0 ? _b : '',
                        keyObject: keyObjectThumbnail,
                        contentType,
                    },
                });
                return {
                    status: 200,
                    success: true,
                    message: 'UPLOAD_FILE_SUCCESSFULLY',
                    data: {
                        privateUrl: url,
                        expired: this.expiredTime,
                        contentType,
                        keyObjectThumbnail,
                        userId: currentSong.userReference,
                    },
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'UPLOAD_FILE_FAILED',
                    errors: error,
                };
            }
        });
    }
}
exports.default = S3Service;
//# sourceMappingURL=s3.service.js.map