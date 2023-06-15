"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("@/controllers/user.controller"));
const verifyEmailForm_middleware_1 = __importDefault(require("@/middlewares/verifyEmailForm.middleware"));
const router = (0, express_1.Router)();
router.post('/checkGmail', user_controller_1.default.checkGmail);
router.post('/sendCode', user_controller_1.default.createRequestAuthenticationEmail);
router.post('/signupForm', verifyEmailForm_middleware_1.default, user_controller_1.default.signupForm);
exports.default = router;
