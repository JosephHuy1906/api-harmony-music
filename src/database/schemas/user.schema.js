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
const userSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true, maxlength: 40 },
    email: { type: String, required: true },
    avatar: {
        type: String,
        default: 'https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg',
    },
    locale: { type: String, default: 'vi' },
    refreshToken: { type: String, required: true },
    playlistReference: [
        {
            type: String,
            ref: 'playlist',
        },
    ],
    favoriteListReference: { type: String, ref: 'favorite' },
    historyReference: { type: String, ref: 'history' },
    composerReference: { type: String, ref: 'composer' },
    isRegistrationForm: { type: Boolean, default: false },
    password: { type: String, default: null },
}, {
    _id: false,
    timestamps: true,
});
exports.default = mongoose_1.default.model('user', userSchema);
