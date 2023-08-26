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
class AlbumFilter {
    constructor(props) {
        this._id = props._id;
        this.title = props.title;
        this.thumbnailUrl = props.thumbnailUrl;
        this.thumbnail = props.thumbnail;
        this.userReference = props.userReference;
        this.listSong = props.listSong;
        this.publish = props.publish;
    }
}
exports.default = AlbumFilter;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AlbumFilter.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AlbumFilter.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], AlbumFilter.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], AlbumFilter.prototype, "thumbnail", void 0);
__decorate([
    (0, IsGenerateCollection_decorator_1.default)(),
    __metadata("design:type", Array)
], AlbumFilter.prototype, "listSong", void 0);
__decorate([
    (0, IsGenerateCollection_decorator_1.default)(),
    __metadata("design:type", String)
], AlbumFilter.prototype, "userReference", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], AlbumFilter.prototype, "publish", void 0);
//# sourceMappingURL=album.filter.js.map