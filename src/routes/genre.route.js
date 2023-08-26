"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genre_controller_1 = __importDefault(require("@/controllers/genre.controller"));
const authVerifyToken_middleware_1 = require("@/middlewares/authVerifyToken.middleware");
const router = (0, express_1.Router)();
const genreControllerInstance = new genre_controller_1.default();
router.route('/topListsong').get(genreControllerInstance.getGenreTopListSong.bind(genreControllerInstance));
router.route('/top').get(genreControllerInstance.getGenreTop.bind(genreControllerInstance));
router.route('/:id')
    .get(genreControllerInstance.getById.bind(genreControllerInstance))
    .put(authVerifyToken_middleware_1.authenticationAdmin, genreControllerInstance.update.bind(genreControllerInstance));
router
    .route('/')
    .get(genreControllerInstance.getAll.bind(genreControllerInstance))
    .post(authVerifyToken_middleware_1.authenticationAdmin, genreControllerInstance.create.bind(genreControllerInstance)); // middleware admin role
exports.default = router;
//# sourceMappingURL=genre.route.js.map