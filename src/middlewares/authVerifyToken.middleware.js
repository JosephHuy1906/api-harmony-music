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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationAdmin = exports.authenticationComposer = exports.authenticationUser = void 0;
const role_enum_1 = require("@/constraints/enums/role.enum");
const index_instance_1 = require("@/instances/index.instance");
const jwtToken_util_1 = require("@/utils/jwtToken.util");
function authenticationUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authentication = req.headers.authorization;
            const bearerToken = authentication && authentication.split('Bearer ')[1];
            if (!bearerToken)
                return res.status(403).json({
                    status: 403,
                    success: false,
                    message: 'NO_PROVIDER_BEARER_TOKEN',
                });
            const verify = (0, jwtToken_util_1.verifyToken)(bearerToken, process.env.SECRET_ACCESS_TOKEN);
            res.locals.memberDecoded = verify;
            next();
        }
        catch (error) {
            console.log(error);
            const condition = typeof error === 'object' &&
                error.hasOwnProperty('name') &&
                error.hasOwnProperty('message');
            return res.status(500).json({
                status: condition ? 403 : 500,
                success: false,
                message: 'INVALID_TOKEN',
                errors: error,
            });
        }
    });
}
exports.authenticationUser = authenticationUser;
function authenticationComposer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authentication = req.headers.authorization;
            const bearerToken = authentication && authentication.split('Bearer ')[1];
            if (!bearerToken)
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'NO_PROVIDER_BEARER_TOKEN',
                });
            const verify = (0, jwtToken_util_1.verifyToken)(bearerToken, process.env.SECRET_ACCESS_TOKEN);
            if (verify.role !== role_enum_1.RoleConstant.COMPOSER)
                return res.status(403).json({
                    status: 403,
                    success: false,
                    message: 'PERMISSION_DENIED',
                });
            const user = yield index_instance_1.userService.getById(verify._id);
            if (!user.success &&
                user.data &&
                user.data.role !== role_enum_1.RoleConstant.COMPOSER)
                return res.status(400).json({
                    status: 403,
                    success: false,
                    message: 'PERMISSION_DENIED',
                });
            res.locals.memberDecoded = verify;
            next();
        }
        catch (error) {
            console.log(error);
            const condition = typeof error === 'object' &&
                error.hasOwnProperty('name') &&
                error.hasOwnProperty('message');
            return res.status(500).json({
                status: condition ? 403 : 500,
                success: false,
                message: 'AUTHENTICATION_COMPOSER_FAILED',
                errors: error,
            });
        }
    });
}
exports.authenticationComposer = authenticationComposer;
function authenticationAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authentication = req.headers.authorization;
            const bearerToken = authentication && authentication.split('Bearer ')[1];
            if (!bearerToken)
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'NO_PROVIDER_BEARER_TOKEN',
                });
            const verify = (0, jwtToken_util_1.verifyToken)(bearerToken, process.env.SECRET_ACCESS_TOKEN);
            if (verify.role !== role_enum_1.RoleConstant.ROOT_ADMIN)
                return res.status(403).json({
                    status: 403,
                    success: false,
                    message: 'PERMISSION_DENIED',
                });
            const admin = yield index_instance_1.adminService.getById(verify._id);
            if (!admin.success &&
                admin.data &&
                admin.data.role !== role_enum_1.RoleConstant.ROOT_ADMIN)
                return res.status(400).json({
                    status: 403,
                    success: false,
                    message: 'PERMISSION_DENIED',
                });
            res.locals.memberDecoded = verify;
            next();
        }
        catch (error) {
            console.log(error);
            const condition = typeof error === 'object' &&
                error.hasOwnProperty('name') &&
                error.hasOwnProperty('message');
            return res.status(500).json({
                status: condition ? 403 : 500,
                success: false,
                message: 'AUTHENTICATION_COMPOSER_FAILED',
                errors: error,
            });
        }
    });
}
exports.authenticationAdmin = authenticationAdmin;
//# sourceMappingURL=authVerifyToken.middleware.js.map