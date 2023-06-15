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
const index_decorator_1 = require("@/decorators/index.decorator");
const song_service_1 = __importDefault(require("@/services/song.service"));
const index_enum_1 = require("@/constraints/enums/index.enum");
const requirementFields = [
    'title',
    'composerReference',
    'publish',
    'genresReference',
    'performers',
];
class SongController {
    static async getAll(req, res) {
        const songs = await song_service_1.default.getAll();
        return res.status(songs.status).json(songs);
    }
    static async getById(req, res) {
        const _id = req.params.id;
        const song = await song_service_1.default.getById(_id);
        return res.status(song.status).json(song);
    }
    static async getStreamSong(req, res) {
        const { id } = req.params;
        const range = req.headers.range;
        const songService = await song_service_1.default.getFsStreamSong(id, range);
        if (!songService.success)
            return res.status(songService.status).json(songService);
        res.writeHead(songService.status, {
            ...songService.data?.resHeader,
        });
        songService.data?.fileStream.pipe(res);
    }
    static async middlewareCreateSong(req, res, next) {
        const { title, composerReference } = req.body;
        const { thumbnail, fileSong } = req.files;
        const validate = await song_service_1.default.validateTitleUploadSong(title, composerReference, {
            fileSong: fileSong[0],
            thumbnail: thumbnail[0],
        });
        if (validate.success) {
            return next();
        }
        return res.status(validate.status).json(validate);
    }
    static async create(req, res) {
        const payload = {
            ...req.body,
        };
        const { thumbnail, fileSong } = req.files;
        const createSong = await song_service_1.default.create({
            thumbnail: thumbnail[0],
            fileSong: fileSong[0],
        }, payload);
        return res.status(createSong.status).json(createSong);
    }
}
exports.default = SongController;
__decorate([
    (0, index_decorator_1.IsRequirementTypeId)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController, "getById", null);
__decorate([
    (0, index_decorator_1.IsRequirementTypeId)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController, "getStreamSong", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)(requirementFields, 'body'),
    (0, index_decorator_1.IsRequirementTypeId)([
        'composerReference',
        'genresReference',
        'albumReference',
        'performers',
    ], 'body'),
    (0, index_decorator_1.IsRequirementFiles)([index_enum_1.uploadFiledEnum.FileSong, index_enum_1.uploadFiledEnum.Thumbnail]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], SongController, "middlewareCreateSong", null);
