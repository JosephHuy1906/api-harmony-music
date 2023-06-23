"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const index_enum_1 = require("../constraints/enums/index.enum");
const diskStorageConfig = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        switch (file.fieldname) {
            case index_enum_1.uploadFiledEnum.Thumbnail:
                cb(null, path_1.default.join(__dirname.replace('configs', 'resources/music/thumbnails')));
                break;
            case index_enum_1.uploadFiledEnum.FileSong:
                cb(null, path_1.default.join(__dirname.replace('configs', 'resources/music/files')));
                break;
            default:
                cb(null, path_1.default.join(__dirname.replace('configs', 'resources')));
                break;
        }
    },
    // filename: function (req, file, cb) {
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //     if (file.fieldname === 'img') {
    //         cb(
    //             null,
    //             file.fieldname +
    //                 uniqueSuffix +
    //                 '.' +
    //                 file.mimetype.split('/')[1],
    //         );
    //     } else if (file.fieldname === 'mp3') {
    //         cb(
    //             null,
    //             file.fieldname +
    //                 uniqueSuffix +
    //                 '.' +
    //                 file.mimetype.split('/')[1],
    //         );
    //     } else {
    //         cb(new Error('Invalid field name'), JSON.stringify(false));
    //     }
    // },
});
exports.default = diskStorageConfig;
