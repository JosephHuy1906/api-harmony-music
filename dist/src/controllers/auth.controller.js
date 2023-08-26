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
const common_enum_1 = require("../constraints/enums/common.enum");
const redirect_enum_1 = require("../constraints/enums/redirect.enum");
const index_decorator_1 = require("../decorators/index.decorator");
const environment_1 = require("../environments/environment");
const index_instance_1 = require("../instances/index.instance");
class AuthController {
    constructor() { }
    generateRefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.body;
            const refererTokenService = yield index_instance_1.authService.generateRefererToken(refreshToken);
            return res.status(refererTokenService.status).json(refererTokenService);
        });
    }
    loginForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const loginService = yield index_instance_1.authService.loginForm(payload);
            return res.status(loginService.status).json(loginService);
        });
    }
    loginAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const loginAdminService = yield index_instance_1.authService.loginAdmin(payload);
            return res.status(loginAdminService.status).json(loginAdminService);
        });
    }
    loginPassport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.user;
            const loginServiceGGFB = yield index_instance_1.authService.loginGGFB(email);
            if (!loginServiceGGFB.success)
                return res.status(loginServiceGGFB.status).redirect('');
            res.cookie(common_enum_1.EClientCookie.HARMONY_USER_TOKEN, JSON.stringify(loginServiceGGFB.data), {
                domain: environment_1.environment.DOMAIN_CLIENT,
                secure: environment_1.environment.IS_PRODUCTION,
                sameSite: 'strict',
                maxAge: 259200000,
            });
            return res
                .status(loginServiceGGFB.status)
                .redirect(`${environment_1.environment.CLIENT_URL}${redirect_enum_1.ERedirect.REDIRECT_LOGIN_SOCIAL_SUCCESS}`);
        });
    }
}
exports.default = AuthController;
__decorate([
    (0, index_decorator_1.IsRequirementReq)('refreshToken', 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateRefreshToken", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)(['email', 'password'], 'body'),
    (0, index_decorator_1.IsRequirementEmail)('email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginForm", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)(['email', 'password'], 'body'),
    (0, index_decorator_1.IsRequirementEmail)('email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginAdmin", null);
//# sourceMappingURL=auth.controller.js.map