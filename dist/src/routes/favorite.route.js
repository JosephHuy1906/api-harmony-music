"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const favorite_controller_1 = __importDefault(require("../controllers/favorite.controller"));
const authVerifyToken_middleware_1 = require("../middlewares/authVerifyToken.middleware");
const express_1 = require("express");
const router = (0, express_1.Router)();
const favoriteInstance = new favorite_controller_1.default();
router
    .route('/')
    .get(authVerifyToken_middleware_1.authenticationUser, favoriteInstance.getInformation.bind(favoriteInstance))
    .post(authVerifyToken_middleware_1.authenticationUser, favoriteInstance.mergingCreateUpdate.bind(favoriteInstance));
exports.default = router;
//# sourceMappingURL=favorite.route.js.map