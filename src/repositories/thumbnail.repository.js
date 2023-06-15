"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
class ThumbnailRepository {
    static async getInformationThumbnail(path, resize) {
        return new Promise((resolve, reject) => {
            if (resize) {
                (0, sharp_1.default)(path)
                    .toFormat('jpeg')
                    .resize(Number.parseInt(resize.split('x')[0]), Number.parseInt(resize.split('x')[1]))
                    .toBuffer((err, data) => {
                    if (err)
                        reject(err);
                    resolve(data);
                });
            }
            else {
                (0, sharp_1.default)(path)
                    .toFormat('jpeg')
                    .toBuffer((err, data) => {
                    if (err)
                        reject(err);
                    resolve(data);
                });
            }
        });
    }
}
exports.default = ThumbnailRepository;
