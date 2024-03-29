"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const songDraft_controller_1 = __importDefault(require("../controllers/songDraft.controller"));
const SongDraftInstance = new songDraft_controller_1.default();
const router = (0, express_1.Router)();
router
    .route('/:id')
    .get(SongDraftInstance.getSongDraftByUserId.bind(SongDraftInstance));
exports.default = router;
//# sourceMappingURL=song.Drafts.route.js.map