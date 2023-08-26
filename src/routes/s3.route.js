"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const s3_controller_1 = __importDefault(require("@/controllers/s3.controller"));
const authVerifyToken_middleware_1 = require("@/middlewares/authVerifyToken.middleware");
const s3ControllerInstance = new s3_controller_1.default();
const router = (0, express_1.Router)();
router
    .route('/thumbnail')
    .post(authVerifyToken_middleware_1.authenticationComposer, s3ControllerInstance.postSignedUrlS3Thumbnail.bind(s3ControllerInstance));
router
    .route('/audio')
    .post(authVerifyToken_middleware_1.authenticationComposer, s3ControllerInstance.postSignedUrlS3Audio.bind(s3ControllerInstance));
router
    .route('/album')
    .post(authVerifyToken_middleware_1.authenticationComposer, s3ControllerInstance.postSignedUrlS3Album.bind(s3ControllerInstance));
router
    .route('/userAvatar')
    .post(authVerifyToken_middleware_1.authenticationUser, s3ControllerInstance.postSignedUrlS3UserAvatar.bind(s3ControllerInstance));
exports.default = router;
//# sourceMappingURL=s3.route.js.map