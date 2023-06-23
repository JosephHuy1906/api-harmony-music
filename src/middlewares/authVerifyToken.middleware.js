"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationComposer = exports.authenticationUser = void 0;
const role_enum_1 = require("@/constraints/enums/role.enum");
const user_service_1 = __importDefault(require("@/services/user.service"));
const jwtToken_util_1 = require("@/utils/jwtToken.util");
async function authenticationUser(req, res, next) {
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
}
exports.authenticationUser = authenticationUser;
async function authenticationComposer(req, res, next) {
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
        if (verify.role !== role_enum_1.RoleConstant.COMPOSER)
            return res.status(403).json({
                status: 403,
                success: false,
                message: 'PERMISSION_DENIED',
            });
        const user = await user_service_1.default.getById(verify._id);
        if (!user.success ||
            user.data === null ||
            !user.data?.composerReference)
            return res.status(400).json({
                status: 400,
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
}
exports.authenticationComposer = authenticationComposer;
