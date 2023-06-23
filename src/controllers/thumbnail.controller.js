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
const thumbnail_service_1 = __importDefault(require("../services/thumbnail.service"));
class ThumbnailController {
    static async getById(req, res) {
        const slugId = req.params.id;
        const resizeQuery = req.query.resize;
        const thumbnailService = await thumbnail_service_1.default.getThumbnail(slugId, resizeQuery);
        if (!thumbnailService.success)
            return res.status(thumbnailService.status).json(thumbnailService);
        return res
            .status(thumbnailService.status)
            .set('Content-Type', 'image/jpeg')
            .send(thumbnailService.data);
    }
}
exports.default = ThumbnailController;
__decorate([
    (0, index_decorator_1.IsRequirementReq)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ThumbnailController, "getById", null);
