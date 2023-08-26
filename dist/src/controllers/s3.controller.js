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
class S3Controller {
    constructor() { }
    postSignedUrlS3Audio(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = res.locals.memberDecoded) === null || _a === void 0 ? void 0 : _a._id;
            const signedUrlS3Service = yield index_instance_1.s3Service.getSignUrlForUploadAudioS3(userId !== null && userId !== void 0 ? userId : '');
            return res.status(200).json(signedUrlS3Service);
        });
    }
    postSignedUrlS3Thumbnail(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = res.locals.memberDecoded) === null || _a === void 0 ? void 0 : _a._id;
            const { uploadId, contentType } = req.body;
            const signedUrlS3Service = yield index_instance_1.s3Service.getSignUrlForUploadThumbnailS3(userId !== null && userId !== void 0 ? userId : '', uploadId, contentType);
            return res.status(200).json(signedUrlS3Service);
        });
    }
    postSignedUrlS3Album(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = res.locals.memberDecoded) === null || _a === void 0 ? void 0 : _a._id;
            const { albumId, contentType } = req.body;
            const signedUrlS3Service = yield index_instance_1.s3Service.getSignUrlForUploadAlbum(userId !== null && userId !== void 0 ? userId : '', albumId, contentType);
            return res.status(200).json(signedUrlS3Service);
        });
    }
    postSignedUrlS3UserAvatar(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = res.locals.memberDecoded) === null || _a === void 0 ? void 0 : _a._id;
            const { contentType } = req.body;
            const signedUrlS3Service = yield index_instance_1.s3Service.getSignUrlForUploadUserAvatar(userId !== null && userId !== void 0 ? userId : '', contentType);
            return res.status(200).json(signedUrlS3Service);
        });
    }
}
exports.default = S3Controller;
__decorate([
    (0, IsRequirementRequest_decorator_1.IsRequirementReq)(['uploadId', 'contentType'], 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], S3Controller.prototype, "postSignedUrlS3Thumbnail", null);
__decorate([
    (0, IsRequirementRequest_decorator_1.IsRequirementReq)(['albumId', 'contentType'], 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], S3Controller.prototype, "postSignedUrlS3Album", null);
__decorate([
    (0, IsRequirementRequest_decorator_1.IsRequirementReq)('contentType', 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], S3Controller.prototype, "postSignedUrlS3UserAvatar", null);
//# sourceMappingURL=s3.controller.js.map