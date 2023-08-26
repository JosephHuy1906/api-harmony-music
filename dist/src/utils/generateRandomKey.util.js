"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
function generateRandomString(length) {
    const randomBytes = crypto_1.default.randomBytes(length / 2);
    return randomBytes.toString('hex').slice(0, length);
}
exports.default = generateRandomString;
//# sourceMappingURL=generateRandomKey.util.js.map