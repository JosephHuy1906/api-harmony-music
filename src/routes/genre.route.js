"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genre_controller_1 = __importDefault(require("../controllers/genre.controller"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/').post(genre_controller_1.default.create); // middleware admin role
exports.default = router;
