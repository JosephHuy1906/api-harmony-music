"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const album_controller_1 = __importDefault(require("../controllers/album.controller"));
const authVerifyToken_middleware_1 = require("../middlewares/authVerifyToken.middleware");
const express_1 = require("express");
const router = (0, express_1.Router)();
const albumControllerInstance = new album_controller_1.default();
router
    .route('/newWeek')
    .get(albumControllerInstance.getAlbumNewWeek.bind(albumControllerInstance));
router
    .route('/:id')
    .get(albumControllerInstance.getById.bind(albumControllerInstance))
    .put(authVerifyToken_middleware_1.authenticationComposer, albumControllerInstance.update.bind(albumControllerInstance));
router
    .route('/')
    .post(authVerifyToken_middleware_1.authenticationComposer, albumControllerInstance.create.bind(albumControllerInstance));
exports.default = router;
//# sourceMappingURL=album.route.js.map