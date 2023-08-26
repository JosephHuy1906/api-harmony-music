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
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_instance_1 = require("@/instances/index.instance");
const jwtToken_util_1 = require("@/utils/jwtToken.util");
const role_enum_1 = require("@/constraints/enums/role.enum");
const admin_filter_1 = __importDefault(require("@/filters/admin.filter"));
const validate_helper_1 = __importDefault(require("@/helpers/validate.helper"));
class AdminService {
    constructor() { }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentAdmin = yield index_instance_1.adminModel.getById(_id);
                return {
                    status: 200,
                    success: true,
                    message: 'GET_ADMIN_BY_ID_SUCCESSFULLY',
                    data: currentAdmin,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_ADMIN_BY_ID_FAILED',
                    errors: error,
                };
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentAdmin = yield index_instance_1.adminModel.getByEmail(email);
                return {
                    status: 200,
                    success: true,
                    message: 'GET_ADMIN_BY_EMAIL_SUCCESSFULLY',
                    data: currentAdmin,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_ADMIN_BY_EMAIL_FAILED',
                    errors: error,
                };
            }
        });
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentAdmin = yield index_instance_1.adminModel.getByEmail(payload.email);
                if (currentAdmin)
                    return {
                        status: 400,
                        success: false,
                        message: 'EMAIL_NOT_FOUND',
                    };
                const _id = (0, uuid_1.v4)();
                const { accessToken, refreshToken } = (0, jwtToken_util_1.generateToken)({
                    _id,
                    email: payload.email,
                    role: role_enum_1.RoleConstant.ROOT_ADMIN,
                });
                const hashPassword = yield bcrypt_1.default.hash(payload.password, 10);
                const adminFilter = new admin_filter_1.default({
                    _id,
                    email: payload.email,
                    name: payload.name,
                    refreshToken,
                    password: hashPassword,
                    role: role_enum_1.RoleConstant.ROOT_ADMIN,
                    avatar: undefined,
                });
                const validation = yield (0, validate_helper_1.default)(adminFilter, 'BAD_REQUEST', true);
                if (validation)
                    return validation;
                yield index_instance_1.adminModel.create(adminFilter);
                return {
                    status: 201,
                    success: true,
                    message: 'SIGN_UP_FORM_SUCCESSFULLY',
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
                    message: 'SIGN_UP_FORM_FAILED',
                    errors: error,
                };
            }
        });
    }
    updateById(_id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updated = yield index_instance_1.adminModel.update(_id, payload);
                return {
                    status: 200,
                    success: true,
                    message: 'GET_ADMIN_BY_EMAIL_SUCCESSFULLY',
                    data: updated,
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'GET_ADMIN_BY_EMAIL_FAILED',
                    errors: error,
                };
            }
        });
    }
}
exports.default = AdminService;
//# sourceMappingURL=admin.service.js.map