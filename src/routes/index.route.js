"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const user_route_1 = __importDefault(require("./user.route"));
const song_route_1 = __importDefault(require("./song.route"));
const composer_route_1 = __importDefault(require("./composer.route"));
const genre_route_1 = __importDefault(require("./genre.route"));
const album_route_1 = __importDefault(require("./album.route"));
const thumnail_route_1 = __importDefault(require("./thumnail.route"));
const rootRouter = (0, express_1.Router)();
rootRouter.use('/thumbnail', thumnail_route_1.default);
rootRouter.use('/genre', genre_route_1.default);
rootRouter.use('/album', album_route_1.default);
rootRouter.use('/composer', composer_route_1.default);
rootRouter.use('/song', song_route_1.default);
rootRouter.use('/auth', auth_route_1.default);
rootRouter.use('/user', user_route_1.default);
rootRouter.use('/', (req, res) => res.end());
exports.default = rootRouter;