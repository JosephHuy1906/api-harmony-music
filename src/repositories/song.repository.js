"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fluentFfmpeg_config_1 = __importDefault(require("@/configs/fluentFfmpeg.config"));
class SongRepository {
    static async getInformationFileSong(file) {
        return new Promise((resolve, reject) => {
            fluentFfmpeg_config_1.default.ffprobe(file.path, async (err, data) => {
                if (err)
                    reject(err);
                resolve(data);
            });
        });
    }
    static async getStream(path) {
        return new Promise((resolve, reject) => {
            resolve((0, fluentFfmpeg_config_1.default)(path));
        });
    }
}
exports.default = SongRepository;
