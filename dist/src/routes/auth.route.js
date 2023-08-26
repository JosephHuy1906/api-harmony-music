"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const passport_1 = __importDefault(require("passport"));
require("../configs/passportGoogle.config");
require("../configs/passportFacebook.config");
const router = (0, express_1.Router)();
const authControllerInstance = new auth_controller_1.default();
router.get('/google', passport_1.default.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
}));
router.get('/google/callback', passport_1.default.authenticate('google', { session: false }), authControllerInstance.loginPassport.bind(authControllerInstance));
router.get('/facebook', passport_1.default.authenticate('facebook', {
    scope: ['public_profile', 'email'],
    session: false,
}));
router.get('/facebook/callback', passport_1.default.authenticate('facebook', { session: false }), authControllerInstance.loginPassport.bind(authControllerInstance));
router.post('/refreshToken', authControllerInstance.generateRefreshToken.bind(authControllerInstance));
router.post('/loginForm', authControllerInstance.loginForm.bind(authControllerInstance));
router.post('/admin', authControllerInstance.loginAdmin.bind(authControllerInstance));
exports.default = router;
//# sourceMappingURL=auth.route.js.map