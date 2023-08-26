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
class FavoriteFilter {
    constructor(props) {
        this._id = props._id;
        this.listSong = props.listSong;
        this.userReference = props.userReference;
    }
}
exports.default = FavoriteFilter;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FavoriteFilter.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], FavoriteFilter.prototype, "userReference", void 0);
__decorate([
    (0, IsGenerateCollection_decorator_1.default)(),
    __metadata("design:type", Array)
], FavoriteFilter.prototype, "listSong", void 0);
//# sourceMappingURL=favorite.filter.js.map