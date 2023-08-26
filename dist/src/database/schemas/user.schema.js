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
const role_enum_1 = require("../../constraints/enums/role.enum");
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true, maxlength: 40 },
    email: { type: String, required: true },
    avatarUrl: {
        type: String,
        default: 'https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg',
    },
    avatarS3: {
        type: {
            bucketName: { type: String, required: true },
            keyObject: { type: String, required: true },
            contentType: { type: String, required: true },
        },
        default: null,
        _id: false,
    },
    locale: { type: String, default: 'vi' },
    refreshToken: { type: String, required: true },
    favoriteListReference: { type: String, ref: 'favorite' },
    historyReference: { type: String, ref: 'history' },
    role: { type: String, default: role_enum_1.RoleConstant.USER },
    isRegistrationForm: { type: Boolean, default: false },
    password: { type: String, default: null },
    playlistReference: [{ type: String, ref: 'playlist' }],
    nickname: { type: String, default: '' },
    isPendingUpgradeComposer: { type: Boolean, default: false },
    albumsReference: [
        {
            type: String,
            ref: 'album',
        },
    ],
    songsReference: [
        {
            type: String,
            ref: 'song',
        },
    ],
}, {
    _id: false,
    timestamps: true,
});
exports.default = mongoose_1.default.model('user', userSchema);
//# sourceMappingURL=user.schema.js.map