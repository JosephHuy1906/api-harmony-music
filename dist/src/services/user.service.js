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
const uuid_1 = require("uuid");
const nodemailer_config_1 = __importDefault(require("../configs/nodemailer.config"));
const role_enum_1 = require("../constraints/enums/role.enum");
const s3_enum_1 = require("../constraints/enums/s3.enum");
const user_filter_1 = __importDefault(require("../filters/user.filter"));
const validate_helper_1 = __importDefault(require("../helpers/validate.helper"));
const index_instance_1 = require("../instances/index.instance");
const service_instance_1 = require("../instances/service.instance");
const jwtToken_util_1 = require("../utils/jwtToken.util");
class UserService {
    constructor() { }
    getAllByComposer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_instance_1.userModel.getAllByComposer();
                return {
                    status: 200,
                    success: true,
                    message: 'GET_USER_COMPOSER_SUCCESSFULLY',
                    data: user,
                };
            }
            catch (error) {
                return {
                    status: 500,
                    success: false,
                    message: 'GET_USER_COMPOSER_FAILED',
                    errors: error,
                };
            }
        });
    }
    getAllByUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_instance_1.userModel.getAllByUser();
                return {
                    status: 200,
                    success: true,
                    message: 'GET_USER_SUCCESSFULLY',
                    data: user,
                };
            }
            catch (error) {
                return {
                    status: 500,
                    success: false,
                    message: 'GET_USER_FAILED',
                    errors: error,
                };
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_instance_1.userModel.getAll();
                return {
                    status: 200,
                    success: true,
                    message: 'GET_USER_ALL_SUCCESSFULLY',
                    data: user,
                };
            }
            catch (error) {
                return {
                    status: 500,
                    success: false,
                    message: 'GET_USER_ALL_FAILED',
                    errors: error,
                };
            }
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_instance_1.userModel.getByIdPopulate(_id);
                if (!user)
                    return {
                        status: 400,
                        success: true,
                        message: 'GET_USER_BY_ID_EXISTS',
                    };
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
        });
    }
    getByNickName(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_instance_1.userModel.getByNickNamePopulate(nickname);
                if (!user)
                    return {
                        status: 400,
                        success: true,
                        message: 'GET_USER_BY_NICK_NAME_EXISTS',
                    };
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
        });
    }
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userInDb = yield index_instance_1.userModel.getByEmail(email);
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
        });
    }
    handleCreateAndSendMail(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = (0, uuid_1.v4)();
                const randomCode = Math.floor(Math.random() * 10000);
                const verificationCode = randomCode < 1000 ? randomCode * 10 : randomCode;
                const hashPassword = yield bcrypt_1.default.hash(payload.password, 10);
                const payloadToModel = Object.assign(Object.assign({}, payload), { _id,
                    verificationCode, password: hashPassword });
                const created = yield index_instance_1.accountPendingVerifyModel.create(payloadToModel);
                this.sendMailToUser({
                    to: created.email,
                    subject: `Thư xác thực email`,
                    message: `Mã xác thực của bạn: <b>${created.verificationCode}</b>`,
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
        });
    }
    signupForm(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collectionValidateUser = yield index_instance_1.accountPendingVerifyModel.getByEmail(payload.email);
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
                    role: role_enum_1.RoleConstant.USER,
                    avatarS3: null,
                });
                const validation = yield (0, validate_helper_1.default)(dataUser, 'BAD_REQUEST', true);
                if (validation)
                    return validation;
                yield index_instance_1.userModel.create(dataUser);
                const deletedCollectionVerifyEmail = yield index_instance_1.accountPendingVerifyModel.deleteById(collectionValidateUser._id);
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
        });
    }
    sendMailToUser({ to, subject, message }) {
        nodemailer_config_1.default.sendMail({
            from: process.env.GMAIL_SERVER,
            to,
            subject,
            html: `<p>${message}</p>`,
        });
    }
    updateFiled(_id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield index_instance_1.userModel.updateById(_id, payload);
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
        });
    }
    pendingUpgradeComposer(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_instance_1.userModel.getById(userId);
                if (!user || user.role === role_enum_1.RoleConstant.COMPOSER)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST',
                    };
                yield this.updateFiled(userId, { isPendingUpgradeComposer: true });
                return {
                    status: 200,
                    success: true,
                    message: 'PENDING_UPGRADE_COMPOSER_SUCCESSFULLY',
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'PENDING_UPGRADE_COMPOSER_FAILED',
                };
            }
        });
    }
    upgradeComposer(userId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield index_instance_1.userModel.getById(userId);
                if (!user ||
                    user.role === role_enum_1.RoleConstant.COMPOSER ||
                    !user.isPendingUpgradeComposer)
                    return {
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST',
                    };
                let randomEntryPointSlug = 0;
                do {
                    randomEntryPointSlug = Math.floor(Math.random() * 10000);
                } while (randomEntryPointSlug < 1000);
                const nickname = ((_a = user.name
                    .normalize('NFD')
                    .replace(/[^a-z0-9\s]/gi, '')
                    .toLocaleLowerCase()
                    .replace(/\s+/g, '')) !== null && _a !== void 0 ? _a : '') +
                    (randomEntryPointSlug < 1000
                        ? randomEntryPointSlug * 10
                        : randomEntryPointSlug);
                yield this.updateFiled(userId, {
                    nickname,
                    role: role_enum_1.RoleConstant.COMPOSER,
                    isPendingUpgradeComposer: false,
                });
                this.sendMailToUser({
                    to: user.email,
                    subject: `Thư chúc mừng`,
                    message: `Cảm ơn bạn đã gắn bó với chúng tôi trong thời gian qua, chúc mừng bạn đã trở thành tác giả của Harmony Music`,
                });
                return {
                    status: 200,
                    success: true,
                    message: 'ASK_PERMISSION_UPGRADE_COMPOSER_BY_USER_SUCCESSFULLY',
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'ASK_PERMISSION_UPGRADE_COMPOSER_BY_USER_FAILED',
                };
            }
        });
    }
    updateProfile(payload) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let nickname = undefined;
                if (payload.name) {
                    let randomEntryPointSlug = 0;
                    do {
                        randomEntryPointSlug = Math.floor(Math.random() * 10000);
                    } while (randomEntryPointSlug < 1000);
                    nickname =
                        ((_a = payload.name
                            .normalize('NFD')
                            .replace(/[^a-z0-9\s]/gi, '')
                            .toLocaleLowerCase()
                            .replace(/\s+/g, '')) !== null && _a !== void 0 ? _a : '') +
                            (randomEntryPointSlug < 1000
                                ? randomEntryPointSlug * 10
                                : randomEntryPointSlug);
                }
                let responseData = undefined;
                if (payload.isNewUploadAvatar) {
                    const response = yield service_instance_1.s3Service.getSignUrlForUploadUserAvatar(payload.userId, payload.contentType || s3_enum_1.EContentTypeObjectS3.JPEG);
                    responseData = response.data;
                }
                yield index_instance_1.userModel.updateById(payload.userId, {
                    name: payload.name,
                    nickname,
                });
                return {
                    status: 200,
                    success: true,
                    message: 'UPDATE_PROFILE_SUCCESSFULLY',
                    data: responseData ? responseData : {},
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    message: 'UPDATE_PROFILE_FAILED',
                    errors: error,
                };
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map