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
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthController {
    static async generateRefreshToken(req, res) {
        const { refreshToken } = req.body;
        const refererTokenService = await auth_service_1.default.generateRefererToken(refreshToken);
        return res.status(refererTokenService.status).json(refererTokenService);
    }
    static async loginForm(req, res) {
        const payload = req.body;
        const loginService = await auth_service_1.default.loginForm(payload);
        return res.status(loginService.status).json(loginService);
    }
    static async loginPassport(req, res) {
        const email = req.user;
        const loginServiceGGFB = await auth_service_1.default.loginGGFB(email);
        return res.status(loginServiceGGFB.status).json(loginServiceGGFB);
    }
}
exports.default = AuthController;
__decorate([
    (0, index_decorator_1.IsRequirementReq)('refreshToken', 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController, "generateRefreshToken", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)(['email', 'password'], 'body'),
    (0, index_decorator_1.IsRequirementEmail)('email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController, "loginForm", null);
