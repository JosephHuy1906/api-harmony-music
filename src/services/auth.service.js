"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jwtToken_util_1 = require("../utils/jwtToken.util");
const user_service_1 = __importDefault(require("./user.service"));
const role_enum_1 = require("../constraints/enums/role.enum");
class AuthService {
    static async generateRefererToken(currentRefreshToken) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(currentRefreshToken, process.env.SECRET_REFRESH_TOKEN);
            const user = await user_service_1.default.getById(decodedToken._id);
            if (!user.success)
                return {
                    ...user,
                    data: null,
                };
            const compareToken = currentRefreshToken.localeCompare(user.data?.refreshToken) === 0;
            if (!compareToken)
                return {
                    status: 403,
                    success: false,
                    message: 'REFRESH_TOKEN_NOT_MATCH',
                };
            const { accessToken, refreshToken } = (0, jwtToken_util_1.generateToken)({
                _id: decodedToken._id,
                email: decodedToken.email,
                role: user.data?.composerReference
                    ? role_enum_1.RoleConstant.COMPOSER
                    : role_enum_1.RoleConstant.USER,
            });
            const updated = await user_service_1.default.updateFiled(decodedToken._id, {
                refreshToken,
            });
            if (!updated.success)
                return {
                    ...updated,
                    data: null,
                };
            return {
                status: 200,
                success: false,
                message: 'GENERATE_REFRESH_TOKEN_SUCCESSFULLY',
                data: {
                    accessToken,
                    refreshToken,
                },
            };
        }
        catch (error) {
            if (typeof error === 'object' &&
                error.hasOwnProperty('name') &&
                error.hasOwnProperty('message'))
                return {
                    status: 403,
                    success: false,
                    message: 'INVALID_REFRESH_TOKEN',
                    errors: error,
                };
            return {
                status: 500,
                success: false,
                message: 'GENERATE_REFRESH_TOKEN_FAILED',
                errors: error,
            };
        }
    }
    static async loginForm(payload) {
        try {
            const user = await user_model_1.default.getByEmail(payload.email);
            if (!user)
                return {
                    status: 403,
                    success: false,
                    message: 'ACCOUNT_NOT_EXIST',
                };
            if (!user.isRegistrationForm)
                return {
                    status: 401,
                    success: false,
                    message: 'ACCOUNT_ALREADY_EXISTS',
                };
            const verifyPassword = await bcrypt_1.default.compare(payload.password, user.password);
            if (!verifyPassword)
                return {
                    status: 401,
                    success: false,
                    message: 'INCORRECT_PASSWORD',
                };
            const { accessToken, refreshToken } = (0, jwtToken_util_1.generateToken)({
                _id: user._id,
                email: user.email,
                role: user.composerReference
                    ? role_enum_1.RoleConstant.COMPOSER
                    : role_enum_1.RoleConstant.USER,
            });
            const updated = await user_model_1.default.updateById(user._id, {
                refreshToken,
            });
            if (!updated)
                return {
                    status: 500,
                    success: false,
                    message: 'LOGIN_FAILED',
                };
            return {
                status: 200,
                success: true,
                message: 'LOGIN_SUCCESSFULLY',
                data: {
                    accessToken,
                    refreshToken,
                },
            };
        }
        catch (error) {
            return {
                status: 500,
                success: false,
                message: 'LOGIN_FORM_FAILED',
                errors: error,
            };
        }
    }
    static async loginGGFB(payload) {
        try {
            const user = await user_model_1.default.getByEmail(payload.email);
            if (!user)
                return {
                    status: 403,
                    success: false,
                    message: 'ACCOUNT_NOT_EXIST',
                };
            if (user.isRegistrationForm)
                return {
                    status: 401,
                    success: false,
                    message: 'ACCOUNT_ALREADY_EXISTS',
                };
            const { accessToken, refreshToken } = (0, jwtToken_util_1.generateToken)({
                _id: user._id,
                email: user.email,
                role: user.composerReference
                    ? role_enum_1.RoleConstant.COMPOSER
                    : role_enum_1.RoleConstant.USER,
            });
            const updated = await user_model_1.default.updateById(user._id, {
                refreshToken,
            });
            if (!updated)
                return {
                    status: 400,
                    success: false,
                    message: 'LOGIN_FAILED',
                };
            return {
                status: 200,
                success: true,
                message: 'LOGIN_SUCCESSFULLY',
                data: {
                    accessToken,
                    refreshToken,
                },
            };
        }
        catch (errors) {
            return {
                status: 500,
                success: false,
                message: 'Faill at auth server',
            };
        }
    }
}
exports.default = AuthService;
