"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const song_controller_1 = __importDefault(require("../controllers/song.controller"));
const uploadSong_middleware_1 = require("../middlewares/uploadSong.middleware");
const authVerifyToken_middleware_1 = require("../middlewares/authVerifyToken.middleware");
const router = (0, express_1.Router)();
router.route('/stream/:id').get(song_controller_1.default.getStreamSong);
router.route('/:id').get(song_controller_1.default.getById);
router
    .route('/')
    .get(song_controller_1.default.getAll)
    .post(authVerifyToken_middleware_1.authenticationComposer, uploadSong_middleware_1.uploadSong, song_controller_1.default.middlewareCreateSong, song_controller_1.default.create);
exports.default = router;
