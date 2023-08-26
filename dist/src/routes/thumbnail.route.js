"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const thumbnail_controller_1 = __importDefault(require("../controllers/thumbnail.controller"));
const express_1 = require("express");
const router = (0, express_1.Router)();
const thumbnailControllerInstance = new thumbnail_controller_1.default();
router
    .route('/avatar/:id')
    .get(thumbnailControllerInstance.getUserAvatar.bind(thumbnailControllerInstance));
router
    .route('/album/:id')
    .get(thumbnailControllerInstance.getAlbum.bind(thumbnailControllerInstance));
router // default get thumbnail song
    .route('/:id')
    .get(thumbnailControllerInstance.getById.bind(thumbnailControllerInstance));
exports.default = router;
//# sourceMappingURL=thumbnail.route.js.map