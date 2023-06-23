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
require("module-alias/register");
const class_validator_1 = require("class-validator");
const IsGenerateCollection_decorator_1 = __importDefault(require("../decorators/IsGenerateCollection.decorator"));
class UserValidation {
    _id;
    email;
    name;
    refreshToken;
    avatar;
    composerReference;
    isRegistrationForm;
    locale;
    password;
    favoriteListReference;
    historyReference;
    playlistReference;
    constructor(payload) {
        this._id = payload._id;
        this.email = payload.email;
        this.name = payload.name;
        this.refreshToken = payload.refreshToken;
        this.password = payload.password;
        this.avatar = payload.avatar;
        this.composerReference = payload.composerReference;
        this.favoriteListReference = payload.favoriteListReference;
        this.historyReference = payload.historyReference;
        this.playlistReference = payload.playlistReference;
        this.isRegistrationForm = payload.isRegistrationForm;
        this.locale = payload.locale;
    }
}
exports.default = UserValidation;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserValidation.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserValidation.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(40),
    __metadata("design:type", String)
], UserValidation.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserValidation.prototype, "refreshToken", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserValidation.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, IsGenerateCollection_decorator_1.default)({
        message: 'Filed _id in collection Composer is empty',
    }),
    __metadata("design:type", String)
], UserValidation.prototype, "composerReference", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserValidation.prototype, "isRegistrationForm", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserValidation.prototype, "locale", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserValidation.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, IsGenerateCollection_decorator_1.default)({
        message: 'Filed _id in collection Favorite is empty',
    }),
    __metadata("design:type", String)
], UserValidation.prototype, "favoriteListReference", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, IsGenerateCollection_decorator_1.default)({
        message: 'Filed _id in collection History is empty',
    }),
    __metadata("design:type", String)
], UserValidation.prototype, "historyReference", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, IsGenerateCollection_decorator_1.default)({
        message: 'Filed _id in collection Playlist is empty',
    }),
    __metadata("design:type", Array)
], UserValidation.prototype, "playlistReference", void 0);
