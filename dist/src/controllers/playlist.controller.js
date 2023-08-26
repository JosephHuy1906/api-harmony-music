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
const IsRequirementRequest_decorator_1 = require("../decorators/IsRequirementRequest.decorator");
const service_instance_1 = require("../instances/service.instance");
class PlaylistController {
    constructor() { }
    getListByUserId(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = res.locals.memberDecoded) === null || _a === void 0 ? void 0 : _a._id;
            const playlistUserService = yield service_instance_1.playlistService.getListByUserId(userId !== null && userId !== void 0 ? userId : '');
            return res.status(playlistUserService.status).json(playlistUserService);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const playlistId = req.params.id;
            const playlistUserService = yield service_instance_1.playlistService.getById(playlistId);
            return res.status(playlistUserService.status).json(playlistUserService);
        });
    }
    create(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_b = (_a = res.locals.memberDecoded) === null || _a === void 0 ? void 0 : _a._id) !== null && _b !== void 0 ? _b : '';
            const payload = req.body;
            Object.assign(payload, { userId });
            const createPlaylistService = yield service_instance_1.playlistService.create(payload);
            return res
                .status(createPlaylistService.status)
                .json(createPlaylistService);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const playlistId = req.params.id;
            const payload = req.body;
            const updateService = yield service_instance_1.playlistService.update(playlistId, payload);
            return res.status(updateService.status).json(updateService);
        });
    }
    forceDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const playlistId = req.params.id;
            const forceDeleteService = yield service_instance_1.playlistService.forceDelete(playlistId);
            return res.status(forceDeleteService.status).json(forceDeleteService);
        });
    }
}
exports.default = PlaylistController;
__decorate([
    (0, IsRequirementRequest_decorator_1.IsRequirementReq)('title', 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "create", null);
__decorate([
    (0, IsRequirementRequest_decorator_1.IsRequirementTypeId)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "update", null);
__decorate([
    (0, IsRequirementRequest_decorator_1.IsRequirementTypeId)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "forceDelete", null);
//# sourceMappingURL=playlist.controller.js.map