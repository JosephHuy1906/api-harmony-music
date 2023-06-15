"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const thumbnail_model_1 = __importDefault(require("@/models/thumbnail.model"));
const thumbnail_repository_1 = __importDefault(require("@/repositories/thumbnail.repository"));
class ThumbnailService {
    static async getThumbnail(slugId, resize) {
        try {
            const thumbnailImg = await thumbnail_model_1.default.getById(slugId);
            if (!thumbnailImg)
                return {
                    status: 400,
                    success: false,
                    message: 'GET_THUMBNAIL_FAILED_ID_NOT_FOUND',
                };
            const filePath = path_1.default.join(__dirname, '../../', thumbnailImg.path);
            console.log(filePath);
            const thumbnailRepo = await thumbnail_repository_1.default.getInformationThumbnail(filePath, resize);
            return {
                status: 200,
                success: true,
                message: 'GET_THUMBNAIL_SUCCESSFULLY',
                data: thumbnailRepo,
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
    }
}
exports.default = ThumbnailService;
