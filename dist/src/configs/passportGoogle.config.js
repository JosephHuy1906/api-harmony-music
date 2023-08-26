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
const role_enum_1 = require("../constraints/enums/role.enum");
const environment_1 = require("../environments/environment");
const index_instance_1 = require("../instances/index.instance");
const jwtToken_util_1 = require("../utils/jwtToken.util");
const dotenv_1 = require("dotenv");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const uuid_1 = require("uuid");
(0, dotenv_1.config)();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${environment_1.environment.ORIGIN}/${environment_1.environment.PREFIX}/${environment_1.environment.VERSION}/auth/google/callback`,
    scope: ['profile'],
}, function (accessTokens, refreshTokens, profile, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = profile._json.email;
        const user = yield index_instance_1.userModel.getByEmail(email);
        if (!user) {
            const _id = (0, uuid_1.v4)();
            const { accessToken, refreshToken } = (0, jwtToken_util_1.generateToken)({
                _id,
                email: email,
                role: role_enum_1.RoleConstant.USER,
            });
            const newUser = yield index_instance_1.userModel.create({
                _id: _id,
                name: profile._json.name,
                email: profile._json.email,
                avatarUrl: profile._json.picture,
                locale: profile._json.locale,
                refreshToken: refreshToken,
                role: role_enum_1.RoleConstant.USER,
                avatarS3: null,
            });
            cb(null, newUser);
        }
        else {
            cb(null, user);
        }
    });
}));
//# sourceMappingURL=passportGoogle.config.js.map