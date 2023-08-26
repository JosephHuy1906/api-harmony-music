"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const song_controller_1 = __importDefault(require("@/controllers/song.controller"));
const authVerifyToken_middleware_1 = require("@/middlewares/authVerifyToken.middleware");
const router = (0, express_1.Router)();
const songControllerInstance = new song_controller_1.default();
router.route('/released').get(songControllerInstance.getSongJustReleased.bind(songControllerInstance));
router.route('/songTop').get(songControllerInstance.getSongTop.bind(songControllerInstance));
router.route('/search').get(songControllerInstance.search.bind(songControllerInstance));
router
    .route('/suggest')
    .get(songControllerInstance.suggest.bind(songControllerInstance));
router
    .route('/stream/:id')
    .get(songControllerInstance.getStreamSong.bind(songControllerInstance));
router
    .route('/increase/:id')
    .post(songControllerInstance.increaseView.bind(songControllerInstance));
router
    .route('/:id')
    .get(songControllerInstance.getById.bind(songControllerInstance))
    .put(authVerifyToken_middleware_1.authenticationComposer, songControllerInstance.update.bind(songControllerInstance))
    .delete(authVerifyToken_middleware_1.authenticationComposer, songControllerInstance.forceDelete.bind(songControllerInstance));
router
    .route('/')
    .get(songControllerInstance.getAll.bind(songControllerInstance))
    .post(authVerifyToken_middleware_1.authenticationComposer, songControllerInstance.create.bind(songControllerInstance));
exports.default = router;
//# sourceMappingURL=song.route.js.map