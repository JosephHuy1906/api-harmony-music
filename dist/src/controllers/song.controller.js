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
const requirementFields = [
    'title',
    'uploadId',
    'publish',
    'genresReference',
    'performers',
];
class SongController {
    constructor() { }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const songs = yield index_instance_1.songService.getAll();
            return res.status(songs.status).json(songs);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params.id;
            const song = yield index_instance_1.songService.getById(_id);
            return res.status(song.status).json(song);
        });
    }
    getSongJustReleased(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = req.query.item;
            const songs = yield index_instance_1.songService.getJustReleased(parseInt(item));
            return res.status(songs.status).json(songs);
        });
    }
    getSongTop(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = req.query.item;
            const song = yield index_instance_1.songService.getTopView(parseInt(item));
            return res.status(song.status).json(song);
        });
    }
    suggest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, size } = req.query;
            const suggestService = yield index_instance_1.songService.suggest(Number.parseInt(page || '1'), Number.parseInt(size || '10'));
            return res.status(suggestService.status).json(suggestService);
        });
    }
    getStreamSong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const range = req.headers.range;
            const getStreamSongService = yield index_instance_1.songService.getStreamSong(id, range);
            if (!getStreamSongService.success)
                return res
                    .status(getStreamSongService.status)
                    .json(getStreamSongService);
            const { data } = getStreamSongService;
            const streamData = data &&
                data.instanceContent &&
                data.instanceContent.Body;
            if (streamData) {
                res.writeHead(getStreamSongService.status, Object.assign({}, data === null || data === void 0 ? void 0 : data.resHeader));
                streamData.pipe(res);
            }
            else {
                delete getStreamSongService.data;
                return res
                    .status(getStreamSongService.status)
                    .json(getStreamSongService);
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const title = req.query.title;
            const song = yield index_instance_1.songService.search(title);
            return res.status(song.status).json(song);
        });
    }
    create(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            Object.assign(payload, {
                userReference: (_b = (_a = res.locals.memberDecoded) === null || _a === void 0 ? void 0 : _a._id) !== null && _b !== void 0 ? _b : '',
            });
            const createSongService = yield index_instance_1.songService.create(payload);
            return res.status(createSongService.status).json(createSongService);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (Object.keys(req.body).length === 0)
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'BAD_REQUEST',
                });
            const payload = req.body;
            const updateSongService = yield index_instance_1.songService.update(id, payload);
            return res.status(updateSongService.status).json(updateSongService);
        });
    }
    forceDelete(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userId = (_a = res.locals.memberDecoded) === null || _a === void 0 ? void 0 : _a._id;
            const forceDeleteSongService = yield index_instance_1.songService.forceDelete(id, userId !== null && userId !== void 0 ? userId : '');
            return res
                .status(forceDeleteSongService.status)
                .json(forceDeleteSongService);
        });
    }
    increaseView(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params.id;
            const increaseService = yield index_instance_1.songService.increaseViewQueue(_id);
            return res.status(increaseService.status).json(increaseService);
        });
    }
}
exports.default = SongController;
__decorate([
    (0, index_decorator_1.IsRequirementTypeId)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "getById", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)('item', 'query'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "getSongJustReleased", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)('item', 'query'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "getSongTop", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "getStreamSong", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)('title', 'query'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "search", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)(requirementFields, 'body'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "create", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "update", null);
__decorate([
    (0, index_decorator_1.IsRequirementReq)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "forceDelete", null);
__decorate([
    (0, index_decorator_1.IsRequirementTypeId)('id', 'params'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "increaseView", null);
//# sourceMappingURL=song.controller.js.map