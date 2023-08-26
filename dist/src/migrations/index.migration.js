"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const process_1 = require("process");
const connect_db_1 = __importDefault(require("@/database/connect.db"));
const album_migration_1 = __importDefault(require("@/migrations/album.migration"));
const genre_migration_1 = __importDefault(require("@/migrations/genre.migration"));
const song_migration_1 = __importDefault(require("@/migrations/song.migration"));
const user_migration_1 = __importDefault(require("@/migrations/user.migration"));
const accountPendingVerify_migration_1 = __importDefault(require("./accountPendingVerify.migration"));
const history_migration_1 = __importDefault(require("./history.migration"));
const playlist_migration_1 = __importDefault(require("./playlist.migration"));
const songDraft_migration_1 = __importDefault(require("./songDraft.migration"));
const createCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield connect_db_1.default.connect();
        yield Promise.all([
            song_migration_1.default.create(db),
            user_migration_1.default.create(db),
            genre_migration_1.default.create(db),
            album_migration_1.default.create(db),
            songDraft_migration_1.default.create(db),
            playlist_migration_1.default.create(db),
            accountPendingVerify_migration_1.default.create(db),
            history_migration_1.default.create(db),
        ]).finally(() => {
            connect_db_1.default.disconnect();
        });
        (0, process_1.exit)();
    }
    catch (error) {
        console.log(error);
    }
});
createCollection();
//# sourceMappingURL=index.migration.js.map