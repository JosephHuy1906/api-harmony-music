"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSong = void 0;
const multer_1 = __importDefault(require("multer"));
const index_enum_1 = require("@/constraints/enums/index.enum");
const multer_util_1 = __importDefault(require("@/utils/multer.util"));
const deleteFile_helper_1 = __importDefault(require("@/helpers/deleteFile.helper"));
function uploadSong(req, res, next) {
    const handleErroring = multer_util_1.default.fields([
        {
            name: index_enum_1.uploadFiledEnum.Thumbnail,
            maxCount: 1,
        },
        { name: index_enum_1.uploadFiledEnum.FileSong, maxCount: 1 },
    ]);
    return handleErroring(req, res, function (err) {
        const files = req.files;
        if (err instanceof multer_1.default.MulterError) {
            console.log(err);
            Object.keys(files).forEach((key) => {
                (0, deleteFile_helper_1.default)(files[key][0]);
            });
            return res.status(400).json({
                status: 400,
                success: false,
                message: `BAD_REQUEST_UPLOAD_FILE_NOT_EXITS_FIELDNAME_OR_INVALID_TYPE`,
                error: err,
            });
        }
        else if (err) {
            console.log(err);
            Object.keys(files).forEach((key) => {
                (0, deleteFile_helper_1.default)(files[key][0]);
            });
            return res.status(400).json({
                status: 400,
                success: false,
                message: `BAD_REQUEST_UPLOAD_FILE_NOT_EXITS_FIELDNAME_OR_INVALID_TYPE`,
                error: err,
            });
        }
        next();
    });
}
exports.uploadSong = uploadSong;
