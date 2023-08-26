"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
const express_1 = require("express");
const router = (0, express_1.Router)();
const adminControllerInstance = new admin_controller_1.default();
router
    .route('/:id')
    .get(adminControllerInstance.getById.bind(adminControllerInstance));
router
    .route('/')
    .post(adminControllerInstance.create.bind(adminControllerInstance));
exports.default = router;
//# sourceMappingURL=admin.route.js.map