"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const playlist_controller_1 = __importDefault(require("@/controllers/playlist.controller"));
const authVerifyToken_middleware_1 = require("@/middlewares/authVerifyToken.middleware");
const express_1 = require("express");
const router = (0, express_1.Router)();
const playlistController = new playlist_controller_1.default();
router
    .route('/:id')
    .get(authVerifyToken_middleware_1.authenticationUser, playlistController.getById.bind(playlistController))
    .put(authVerifyToken_middleware_1.authenticationUser, playlistController.update.bind(playlistController))
    .delete(authVerifyToken_middleware_1.authenticationUser, playlistController.forceDelete.bind(playlistController));
router
    .route('/')
    .get(authVerifyToken_middleware_1.authenticationUser, playlistController.getListByUserId.bind(playlistController))
    .post(authVerifyToken_middleware_1.authenticationUser, playlistController.create.bind(playlistController));
exports.default = router;
//# sourceMappingURL=playlist.route.js.map