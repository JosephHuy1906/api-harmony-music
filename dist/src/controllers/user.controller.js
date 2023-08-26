"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const index_decorator_1 = require("../decorators/index.decorator");
const index_instance_1 = require("../instances/index.instance");
class UserController {
    constructor() { }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_instance_1.userService.getAll();
            return res.status(user.status).json(user);
        });
    }
    getAllByComposer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_instance_1.userService.getAllByComposer();
            return res.status(user.status).json(user);
        });
    }
    getAllByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_instance_1.userService.getAllByUser();
            return res.status(user.status).json(user);
        });
    }
    checkGmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const checkEmailService = yield index_instance_1.userService.checkEmail(email);
            if (!checkEmailService.success)
                return res.status(checkEmailService.status).json(checkEmailService);
            next();
        });
    }
    getByNickName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nickname = req.params.id;
            const user = yield index_instance_1.userService.getByNickName(nickname);
            return res.status(user.status).json(user);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = yield index_instance_1.userService.getById(id);
            return res.status(user.status).json(user);
        });
    }
    createRequestAuthenticationEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const createAndSendMailService = yield index_instance_1.userService.handleCreateAndSendMail(payload);
            return res
                .status(createAndSendMailService.status)
                .json(createAndSendMailService);
        });
    }
    signupForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const signUpFormService = yield index_instance_1.userService.signupForm(payload);
            return res.status(signUpFormService.status).json(signUpFormService);
        });
    }
    permissionComposer(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = res.locals.memberDecoded) === null || _a === void 0 ? void 0 : _a._id;
            const pendingUpgradeComposerService = yield index_instance_1.userService.pendingUpgradeComposer(userId !== null && userId !== void 0 ? userId : '');
            return res
                .status(pendingUpgradeComposerService.status)
                .json(pendingUpgradeComposerService);
        });
    }
    AskForPermissionUpgradeComposer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.body.userId;
            const upgradeComposerService = yield index_instance_1.userService.upgradeComposer(userId);
            return res
                .status(upgradeComposerService.status)
                .json(upgradeComposerService);
        });
    }
    updateProfileUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = res.locals.memberDecoded) === null || _a === void 0 ? void 0 : _a._id;
            const { isNewUploadAvatar, name } = req.body;
            const upgradeComposerService = yield index_instance_1.userService.updateProfile({
                name,
                isNewUploadAvatar,
                userId: userId !== null && userId !== void 0 ? userId : '',
            });
            return res
                .status(upgradeComposerService.status)
                .json(upgradeComposerService);
        });
    }
}
exports.default = UserController;
__decorate([
    (0, index_decorator_1.IsRequirementReq)('email', 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkGmail", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getByNickName", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)(['email', 'password', 'username'], 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createRequestAuthenticationEmail", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)(['email', 'verificationCode'], 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signupForm", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)('userId', 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "AskForPermissionUpgradeComposer", null);
//# sourceMappingURL=user.controller.js.map