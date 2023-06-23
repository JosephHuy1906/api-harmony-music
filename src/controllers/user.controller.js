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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_decorator_1 = require("../decorators/index.decorator");
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    static async checkGmail(req, res, next) {
        const { email } = req.body;
        const checkEmailService = await user_service_1.default.checkEmail(email);
        return res.status(checkEmailService.status).json(checkEmailService);
    }
    static async createRequestAuthenticationEmail(req, res) {
        const payload = req.body;
        const createAndSendMailService = await user_service_1.default.handleCreateAndSendMail(payload);
        return res
            .status(createAndSendMailService.status)
            .json(createAndSendMailService);
    }
    static async signupForm(req, res) {
        const payload = req.body;
        const signUpFormService = await user_service_1.default.signupForm(payload);
        return res.status(signUpFormService.status).json(signUpFormService);
    }
}
exports.default = UserController;
__decorate([
    (0, index_decorator_1.IsRequirementReq)('email', 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController, "checkGmail", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)(['email', 'password', 'username'], 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController, "createRequestAuthenticationEmail", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)(['email', 'verificationCode'], 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController, "signupForm", null);
