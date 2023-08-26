"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const history_controller_1 = __importDefault(require("../controllers/history.controller"));
const authVerifyToken_middleware_1 = require("../middlewares/authVerifyToken.middleware");
const express_1 = require("express");
const router = (0, express_1.Router)();
const historyInstance = new history_controller_1.default();
router
    .route('/')
    .get(authVerifyToken_middleware_1.authenticationUser, historyInstance.information.bind(historyInstance))
    .post(authVerifyToken_middleware_1.authenticationUser, historyInstance.mergingCreateUpdate.bind(historyInstance));
exports.default = router;
//# sourceMappingURL=history.route.js.map