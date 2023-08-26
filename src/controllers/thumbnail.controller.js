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
const index_decorator_1 = require("@/decorators/index.decorator");
const index_instance_1 = require("@/instances/index.instance");
class ThumbnailController {
    constructor() { }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const slugId = req.params.id;
            const resizeQuery = req.query.resize;
            const getThumbnailService = yield index_instance_1.thumbnailService.getThumbnailSong(slugId, resizeQuery);
            if (!getThumbnailService.success)
                return res
                    .status(getThumbnailService.status)
                    .json(getThumbnailService);
            return res
                .status(getThumbnailService.status)
                .set('Content-Type', 'image/jpeg')
                .send(getThumbnailService.data);
        });
    }
    getAlbum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const slugId = req.params.id;
            const resizeQuery = req.query.resize;
            const getThumbnailService = yield index_instance_1.thumbnailService.getThumbnailAlbum(slugId, resizeQuery);
            if (!getThumbnailService.success)
                return res
                    .status(getThumbnailService.status)
                    .json(getThumbnailService);
            return res
                .status(getThumbnailService.status)
                .set('Content-Type', 'image/jpeg')
                .send(getThumbnailService.data);
        });
    }
    getUserAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const slugId = req.params.id;
            const resizeQuery = req.query.resize;
            const getThumbnailService = yield index_instance_1.thumbnailService.getThumbnailUserAvatar(slugId, resizeQuery);
            if (!getThumbnailService.success)
                return res
                    .status(getThumbnailService.status)
                    .json(index_instance_1.thumbnailService);
            return res
                .status(getThumbnailService.status)
                .set('Content-Type', 'image/jpeg')
                .send(getThumbnailService.data);
        });
    }
}
exports.default = ThumbnailController;
__decorate([
    (0, index_decorator_1.IsRequirementReq)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ThumbnailController.prototype, "getById", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ThumbnailController.prototype, "getAlbum", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ThumbnailController.prototype, "getUserAvatar", null);
//# sourceMappingURL=thumbnail.controller.js.map