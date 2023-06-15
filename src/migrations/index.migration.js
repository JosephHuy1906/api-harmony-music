"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("module-alias/register");
const process_1 = require("process");
const song_migration_1 = __importDefault(require("@/migrations/song.migration"));
const composer_migration_1 = __importDefault(require("@/migrations/composer.migration"));
const user_migration_1 = __importDefault(require("@/migrations/user.migration"));
const songPath_migration_1 = __importDefault(require("@/migrations/songPath.migration"));
const genre_migration_1 = __importDefault(require("@/migrations/genre.migration"));
const album_migration_1 = __importDefault(require("@/migrations/album.migration"));
const thumbnail_migration_1 = __importDefault(require("@/migrations/thumbnail.migration"));
const connect_db_1 = __importDefault(require("@/database/connect.db"));
const createCollection = async () => {
    try {
        const db = await connect_db_1.default.connect();
        await Promise.all([
            song_migration_1.default.create(db),
            composer_migration_1.default.create(db),
            user_migration_1.default.create(db),
            songPath_migration_1.default.create(db),
            genre_migration_1.default.create(db),
            album_migration_1.default.create(db),
            thumbnail_migration_1.default.create(db),
        ]).finally(() => {
            connect_db_1.default.disconnect();
        });
        (0, process_1.exit)();
    }
    catch (error) {
        console.log(error);
    }
};
createCollection();
