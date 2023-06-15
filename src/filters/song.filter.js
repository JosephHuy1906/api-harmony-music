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
const IsGenerateCollection_decorator_1 = __importDefault(require("@/decorators/IsGenerateCollection.decorator"));
const class_validator_1 = require("class-validator");
class SongFilter {
    _id;
    title;
    thumbnail;
    publish;
    duration;
    songPathReference;
    composerReference;
    albumReference;
    genresReference;
    performers;
    views;
    constructor(params) {
        this._id = params._id;
        this.title = params.title;
        this.albumReference = params.albumReference;
        this.composerReference = params.composerReference;
        this.duration = params.duration;
        this.genresReference = params.genresReference;
        this.performers = params.performers;
        this.publish = params.publish;
        this.thumbnail = params.thumbnail;
        this.songPathReference = params.songPathReference;
        this.views = params.views;
    }
}
exports.default = SongFilter;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SongFilter.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SongFilter.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SongFilter.prototype, "thumbnail", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], SongFilter.prototype, "publish", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SongFilter.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, IsGenerateCollection_decorator_1.default)({
        message: 'Property songPathId missing key _id',
    }),
    __metadata("design:type", String)
], SongFilter.prototype, "songPathReference", void 0);
__decorate([
    (0, IsGenerateCollection_decorator_1.default)({
        message: 'Property composerId missing key _id',
    }),
    __metadata("design:type", String)
], SongFilter.prototype, "composerReference", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, IsGenerateCollection_decorator_1.default)({
        message: 'Property albumId missing key _id in array type',
    }),
    __metadata("design:type", Array)
], SongFilter.prototype, "albumReference", void 0);
__decorate([
    (0, IsGenerateCollection_decorator_1.default)({
        message: 'Property genresId missing key _id in array type',
    }),
    __metadata("design:type", Array)
], SongFilter.prototype, "genresReference", void 0);
__decorate([
    (0, IsGenerateCollection_decorator_1.default)({
        message: 'Property performers missing key _id in array type',
    }),
    __metadata("design:type", Array)
], SongFilter.prototype, "performers", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], SongFilter.prototype, "views", void 0);
