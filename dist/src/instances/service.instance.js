"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistService = exports.adminService = exports.userService = exports.thumbnailService = exports.songDraftService = exports.s3Service = exports.historyService = exports.genreService = exports.favoriteService = exports.authService = exports.albumService = exports.songService = void 0;
const admin_service_1 = __importDefault(require("../services/admin.service"));
const album_service_1 = __importDefault(require("../services/album.service"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const favorite_service_1 = __importDefault(require("../services/favorite.service"));
const genre_service_1 = __importDefault(require("../services/genre.service"));
const history_service_1 = __importDefault(require("../services/history.service"));
const playlist_service_1 = __importDefault(require("../services/playlist.service"));
const s3_service_1 = __importDefault(require("../services/s3.service"));
const song_service_1 = __importDefault(require("../services/song.service"));
const songDraffs_service_1 = __importDefault(require("../services/songDraffs.service"));
const thumbnail_service_1 = __importDefault(require("../services/thumbnail.service"));
const user_service_1 = __importDefault(require("../services/user.service"));
exports.songService = new song_service_1.default();
exports.albumService = new album_service_1.default();
exports.authService = new auth_service_1.default();
exports.favoriteService = new favorite_service_1.default();
exports.genreService = new genre_service_1.default();
exports.historyService = new history_service_1.default();
exports.s3Service = new s3_service_1.default();
exports.songDraftService = new songDraffs_service_1.default();
exports.thumbnailService = new thumbnail_service_1.default();
exports.userService = new user_service_1.default();
exports.adminService = new admin_service_1.default();
exports.playlistService = new playlist_service_1.default();
//# sourceMappingURL=service.instance.js.map