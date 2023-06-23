"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const album_controller_1 = __importDefault(require("@/controllers/album.controller"));
const authVerifyToken_middleware_1 = require("@/middlewares/authVerifyToken.middleware");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/').post(authVerifyToken_middleware_1.authenticationComposer, album_controller_1.default.create);
exports.default = router;
