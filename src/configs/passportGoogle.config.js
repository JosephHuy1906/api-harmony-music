"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const uuid_1 = require("uuid");
const dotenv_1 = require("dotenv");
const user_model_1 = __importDefault(require("../models/user.model"));
const jwtToken_util_1 = require("../utils/jwtToken.util");
const role_enum_1 = require("../constraints/enums/role.enum");
(0, dotenv_1.config)();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/v1/auth/google/callback',
    scope: ['profile'],
}, async function (accessTokens, refreshTokens, profile, cb) {
    const email = profile._json.email;
    const user = await user_model_1.default.getByEmail(email);
    if (!user) {
        const _id = (0, uuid_1.v4)();
        const { accessToken, refreshToken } = (0, jwtToken_util_1.generateToken)({
            _id,
            email: email,
            role: role_enum_1.RoleConstant.USER,
        });
        const newUser = await user_model_1.default.create({
            _id: _id,
            name: profile._json.name,
            email: profile._json.email,
            avatar: profile._json.picture,
            locale: profile._json.locale,
            refreshToken: refreshToken,
        });
        cb(null, newUser);
    }
    else if (user?.isRegistrationForm) {
        return {
            status: 400,
            success: false,
            message: 'The account you have registered by form',
        };
    }
    else {
        cb(null, user);
    }
}));
