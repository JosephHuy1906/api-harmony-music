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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const role_enum_1 = require("../constraints/enums/role.enum");
const index_instance_1 = require("../instances/index.instance");
const jwtToken_util_1 = require("../utils/jwtToken.util");
class AuthService {
    constructor() { }
    generateRefererToken(currentRefreshToken) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedToken = jsonwebtoken_1.default.verify(currentRefreshToken, process.env.SECRET_REFRESH_TOKEN);
                const user = yield index_instance_1.userService.getById(decodedToken._id);
                if (!user.success)
                    return Object.assign(Object.assign({}, user), { data: null });
                const compareToken = currentRefreshToken.localeCompare((_a = user.data) === null || _a === void 0 ? void 0 : _a.refreshToken) === 0;
                if (!compareToken)
                    return {
                        status: 403,
                        success: false,
                        message: 'REFRESH_TOKEN_NOT_MATCH',
                    };
                const { accessToken, refreshToken } = (0, jwtToken_util_1.generateToken)({
                    _id: decodedToken._id,
                    email: decodedToken.email,
                    role: (_c = (_b = user.data) === null || _b === void 0 ? void 0 : _b.role) !== null && _c !== void 0 ? _c : role_enum_1.RoleConstant.USER,
                });
                const updated = yield index_instance_1.userService.updateFiled(decodedToken._id, {
                    refreshToken,
                });
                if (!updated.success)
                    return Object.assign(Object.assign({}, updated), { data: null });
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
        });
    }
    loginForm(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_instance_1.userModel.getByEmail(payload.email);
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
                const verifyPassword = yield bcrypt_1.default.compare(payload.password, user.password);
                if (!verifyPassword)
                    return {
                        status: 401,
                        success: false,
                        message: 'INCORRECT_PASSWORD',
                    };
                const { accessToken, refreshToken } = (0, jwtToken_util_1.generateToken)({
                    _id: user._id,
                    email: user.email,
                    role: user.role,
                });
                const updated = yield index_instance_1.userModel.updateById(user._id, {
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
                        _id: user._id,
                        avatarUrl: user.avatarUrl,
                        email: user.email,
                        name: user.name,
                        locale: user.locale,
                        role: user.role,
                        nickname: user.nickname,
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
        });
    }
    loginAdmin(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentAdmin = yield index_instance_1.adminService.getByEmail(payload.email);
                if (!currentAdmin.data)
                    return {
                        status: 403,
                        success: false,
                        message: 'FORBIDDEN',
                    };
                const verifyPassword = yield bcrypt_1.default.compare(payload.password, currentAdmin.data.password);
                if (!verifyPassword)
                    return {
                        status: 401,
                        success: false,
                        message: 'INCORRECT_PASSWORD',
                    };
                const { accessToken, refreshToken } = (0, jwtToken_util_1.generateToken)({
                    _id: currentAdmin.data._id,
                    email: currentAdmin.data.email,
                    role: currentAdmin.data.role,
                });
                const updated = yield index_instance_1.adminService.updateById(currentAdmin.data._id, {
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
                        adminId: currentAdmin.data._id,
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
        });
    }
    loginGGFB(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_instance_1.userModel.getByEmail(payload.email);
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
                    role: user.role,
                });
                const updated = yield index_instance_1.userModel.updateById(user._id, {
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
                        _id: user._id,
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
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map