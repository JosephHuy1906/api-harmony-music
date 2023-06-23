"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_config_1 = __importDefault(require("../configs/multer.config"));
const index_enum_1 = require("../constraints/enums/index.enum");
const upload = (0, multer_1.default)({
    storage: multer_config_1.default,
    fileFilter(req, file, callback) {
        switch (file.fieldname) {
            case index_enum_1.uploadFiledEnum.FileSong:
                return file.mimetype === 'audio/mpeg'
                    ? callback(null, true)
                    : callback(new Error(`${file.fieldname} type is not audio/mpeg`));
            case index_enum_1.uploadFiledEnum.Thumbnail:
                const conditionMimeType = [
                    'image/jpeg',
                    'image/png',
                    'image/png',
                ];
                return conditionMimeType.indexOf(file.mimetype) !== -1
                    ? callback(null, true)
                    : callback(new Error(`${file.fieldname} type is not `));
            default:
                callback(new Error(`Invalid file name with "${file.fieldname}" `));
                break;
        }
    },
});
exports.default = upload;
