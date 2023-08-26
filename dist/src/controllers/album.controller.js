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
class AlbumController {
    constructor() { }
    getAlbumNewWeek(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = req.query.item;
            const albums = yield index_instance_1.albumService.getAlbumNewWeek(parseInt(item));
            return res.status(albums.status).json(albums);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params.id;
            const album = yield index_instance_1.albumService.getByIdPopulate(_id);
            return res.status(album.status).json(album);
        });
    }
    create(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            Object.assign(payload, {
                userReference: (_b = (_a = res.locals.memberDecoded) === null || _a === void 0 ? void 0 : _a._id) !== null && _b !== void 0 ? _b : '',
            });
            const createAlbumService = yield index_instance_1.albumService.create(payload);
            return res.status(createAlbumService.status).json(createAlbumService);
        });
    }
    update(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const userId = (_b = (_a = res.locals.memberDecoded) === null || _a === void 0 ? void 0 : _a._id) !== null && _b !== void 0 ? _b : '';
            const payload = req.body;
            Object.assign(payload, { userId });
            const updateService = yield index_instance_1.albumService.update(id, payload);
            return res.status(updateService.status).json(updateService);
        });
    }
}
exports.default = AlbumController;
__decorate([
    (0, index_decorator_1.IsRequirementReq)('item', 'query'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "getAlbumNewWeek", null);
__decorate([
    (0, index_decorator_1.IsRequirementTypeId)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "getById", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)(['title', 'publish'], 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "create", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "update", null);
//# sourceMappingURL=album.controller.js.map