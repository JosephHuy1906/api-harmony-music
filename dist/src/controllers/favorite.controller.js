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
const IsRequirementRequest_decorator_1 = require("@/decorators/IsRequirementRequest.decorator");
const index_instance_1 = require("@/instances/index.instance");
class FavoriteController {
    constructor() { }
    getInformation(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const currentUserId = (_b = (_a = res.locals.memberDecoded) === null || _a === void 0 ? void 0 : _a._id) !== null && _b !== void 0 ? _b : '';
            const getFavoriteInfoService = yield index_instance_1.favoriteService.information(currentUserId);
            return res
                .status(getFavoriteInfoService.status)
                .json(getFavoriteInfoService);
        });
    }
    mergingCreateUpdate(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const currentUserIdDecoded = (_b = (_a = res.locals.memberDecoded) === null || _a === void 0 ? void 0 : _a._id) !== null && _b !== void 0 ? _b : '';
            const { songId, typeAction } = req.body;
            const mergingCreateUpdateService = yield index_instance_1.favoriteService.combineCreateUpdate(currentUserIdDecoded, songId, typeAction);
            return res
                .status(mergingCreateUpdateService.status)
                .json(mergingCreateUpdateService);
        });
    }
}
exports.default = FavoriteController;
__decorate([
    (0, IsRequirementRequest_decorator_1.IsRequirementTypeId)('songId', 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "mergingCreateUpdate", null);
//# sourceMappingURL=favorite.controller.js.map