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
const composer_service_1 = __importDefault(require("../services/composer.service"));
class ComposerController {
    static async create(req, res) {
        const payload = req.body;
        const createComposerService = await composer_service_1.default.create({
            _id: payload.userId,
        });
        return res
            .status(createComposerService.status)
            .json(createComposerService);
    }
}
exports.default = ComposerController;
__decorate([
    (0, index_decorator_1.IsRequirementReq)('userId', 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ComposerController, "create", null);
