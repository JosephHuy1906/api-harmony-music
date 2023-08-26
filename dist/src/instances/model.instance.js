"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminModel = exports.userModel = exports.songDraftModel = exports.songModel = exports.playlistModel = exports.historyModel = exports.genreModel = exports.favoriteModel = exports.albumModel = exports.accountPendingVerifyModel = void 0;
const accountPendingVerify_model_1 = __importDefault(require("@/models/accountPendingVerify.model"));
const admin_model_1 = __importDefault(require("@/models/admin.model"));
const album_model_1 = __importDefault(require("@/models/album.model"));
const favorite_model_1 = __importDefault(require("@/models/favorite.model"));
const genre_model_1 = __importDefault(require("@/models/genre.model"));
const history_model_1 = __importDefault(require("@/models/history.model"));
const playlist_model_1 = __importDefault(require("@/models/playlist.model"));
const song_model_1 = __importDefault(require("@/models/song.model"));
const songDraft_model_1 = __importDefault(require("@/models/songDraft.model"));
const user_model_1 = __importDefault(require("@/models/user.model"));
exports.accountPendingVerifyModel = new accountPendingVerify_model_1.default();
exports.albumModel = new album_model_1.default();
exports.favoriteModel = new favorite_model_1.default();
exports.genreModel = new genre_model_1.default();
exports.historyModel = new history_model_1.default();
exports.playlistModel = new playlist_model_1.default();
exports.songModel = new song_model_1.default();
exports.songDraftModel = new songDraft_model_1.default();
exports.userModel = new user_model_1.default();
exports.adminModel = new admin_model_1.default();
//# sourceMappingURL=model.instance.js.map