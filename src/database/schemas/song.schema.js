"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const songSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    publish: { type: Date, required: true },
    performers: [
        {
            type: String,
            ref: 'user',
            required: true,
        },
    ],
    userReference: { type: String, required: true, ref: 'user' },
    albumReference: [{ type: String, ref: 'album' }],
    genresReference: [
        {
            type: String,
            ref: 'genre',
            required: true,
        },
    ],
    thumbnailUrl: { type: String, required: true },
    thumbnail: {
        type: {
            bucketName: { type: String, required: true },
            keyObject: { type: String, required: true },
            contentType: { type: String, required: true },
        },
        _id: false,
        required: true,
    },
    audio: {
        type: {
            bucketName: { type: String, required: true },
            keyObject: { type: String, required: true },
            contentType: { type: String, required: true },
        },
        _id: false,
        required: true,
    },
    views: { type: Number, default: 0 },
}, {
    _id: false,
    timestamps: true,
});
exports.default = mongoose_1.default.model('song', songSchema);
//# sourceMappingURL=song.schema.js.map