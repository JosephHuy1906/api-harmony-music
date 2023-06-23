"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, dotenv_1.config)();
function generateToken(payload) {
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.SECRET_ACCESS_TOKEN, {
        expiresIn: '3days',
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.SECRET_REFRESH_TOKEN, {
        expiresIn: '30days',
    });
    return {
        accessToken,
        refreshToken,
    };
}
exports.default = generateToken;
