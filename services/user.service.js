"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_config_1 = __importDefault(require("../configs/nodemailer.config"));
const accountPendingVerify_model_1 = __importDefault(require("../models/accountPendingVerify.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jwtToken_util_1 = require("../utils/jwtToken.util");
const user_filter_1 = __importDefault(require("../filters/user.filter"));
const validate_helper_1 = __importDefault(require("../helpers/validate.helper"));
const role_enum_1 = require("../constraints/enums/role.enum");
class UserService {
    static async getById(_id) {
        try {
            const user = await user_model_1.default.getById(_id);
            return {
                status: 200,
                success: true,
                message: 'GET_USER_SUCCESSFULLY',
                data: user,
            };
        }
        catch (error) {
            return {
                status: 404,
                success: false,
                message: 'GET_USER_BY_ID_FAILED',
                errors: error,
            };
        }
    }
    static async checkEmail(email) {
        try {
            const userInDb = await user_model_1.default.getByEmail(email);
            const isExitUser = !!userInDb;
            if (isExitUser)
                return {
                    status: 400,
                    success: false,
                    message: 'GMAIL_ALREADY_EXISTS',
                };
            return {
                status: 200,
                success: true,
                message: 'ACCEPTED_GMAIL',
            };
        }
        catch (error) {
            return {
                status: 500,
                success: false,
                message: 'CHECK_EMAIL_FAILED',
                errors: error,
            };
        }
    }
    static async handleCreateAndSendMail(payload) {
        try {
            const _id = (0, uuid_1.v4)();
            const randomCode = Math.floor(Math.random() * 10000);
            const verificationCode = randomCode < 1000 ? randomCode * 10 : randomCode;
            const hashPassword = await bcrypt_1.default.hash(payload.password, 10);
            const payloadToModel = {
                ...payload,
                _id,
                verificationCode,
                password: hashPassword,
            };
            const created = await accountPendingVerify_model_1.default.create(payloadToModel);
            const sended = await nodemailer_config_1.default.sendMail({
                from: process.env.GMAIL_SERVER,
                to: created.email,
                subject: 'Harmony music needs you to verification your email',
                html: `<p>Your verification code is: <b>${created.verificationCode}</b></p>`,
            });
            return {
                status: 201,
                success: true,
                message: 'POST_ACCOUNT_PENDING_SEND_MAIL_SUCCESSFULLY',
            };
        }
        catch (error) {
            return {
                status: 500,
                success: false,
                message: 'POST_ACCOUNT_PENDING_SEND_MAIL_FAILED',
                errors: error,
            };
        }
    }
    static async signupForm(payload) {
        try {
            const collectionValidateUser = await accountPendingVerify_model_1.default.getByEmail(payload.email);
            if (!collectionValidateUser)
                return {
                    status: 400,
                    success: false,
                    message: 'EMAIL_NOT_FOUND',
                };
            const _id = (0, uuid_1.v4)();
            const { accessToken, refreshToken } = (0, jwtToken_util_1.generateToken)({
                _id,
                email: collectionValidateUser.email,
                role: role_enum_1.RoleConstant.USER,
            });
            const dataUser = new user_filter_1.default({
                _id,
                email: collectionValidateUser.email,
                name: collectionValidateUser.username,
                refreshToken,
                password: collectionValidateUser.password,
                isRegistrationForm: true,
            });
            const validation = await (0, validate_helper_1.default)(dataUser, 'BAD_REQUEST', true);
            if (validation)
                return validation;
            await user_model_1.default.create(dataUser);
            const deletedCollectionVerifyEmail = await accountPendingVerify_model_1.default.deleteById(collectionValidateUser._id);
            if (!deletedCollectionVerifyEmail)
                return {
                    status: 500,
                    success: false,
                    message: 'DELETE_ACCOUNT_PENDING_FAILED',
                };
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
    }
    static async updateFiled(_id, payload) {
        try {
            const updatedUser = await user_model_1.default.updateById(_id, payload);
            return {
                status: 200,
                success: true,
                message: 'UPDATE_USER_SUCCESSFULLY',
                data: updatedUser,
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                success: false,
                message: 'UPDATE_USER_FAILED',
                errors: error,
            };
        }
    }
}
exports.default = UserService;
