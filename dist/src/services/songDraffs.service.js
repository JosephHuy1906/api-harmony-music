"use strict";
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
const currentStep_enum_1 = require("@/constraints/enums/currentStep.enum");
const index_instance_1 = require("@/instances/index.instance");
class SongDraftService {
    constructor() { }
    getListSongDraftById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const songDraft = yield index_instance_1.songDraftModel.getUserId(userId);
                if (!songDraft)
                    return {
                        status: 400,
                        success: false,
                        message: 'SONG_DRAFTS_NOT_FOUND',
                    };
                if (songDraft.thumbnail === null) {
                    return {
                        status: 200,
                        success: false,
                        message: 'GET_SONG_DRAFT_SUCCESSFULLY',
                        data: Object.assign(Object.assign({}, songDraft), { currentStep: currentStep_enum_1.currentStep.THUMBNAIL }),
                    };
                }
                else {
                    return {
                        status: 200,
                        success: false,
                        message: 'GET_SONG_DRAFT_SUCCESSFULLY',
                        data: Object.assign(Object.assign({}, songDraft), { currentStep: currentStep_enum_1.currentStep.INFORMATION }),
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    success: false,
                    message: 'GET_SONG_DRAFFS_BY_ID_FAILED',
                };
            }
        });
    }
}
exports.default = SongDraftService;
//# sourceMappingURL=songDraffs.service.js.map