"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("@/controllers/user.controller"));
const authVerifyToken_middleware_1 = require("@/middlewares/authVerifyToken.middleware");
const verifyEmailForm_middleware_1 = __importDefault(require("@/middlewares/verifyEmailForm.middleware"));
const router = (0, express_1.Router)();
const userControllerInstance = new user_controller_1.default();
router.get('/', userControllerInstance.getAll.bind(userControllerInstance));
router.get('/byUser', userControllerInstance.getAllByUser.bind(userControllerInstance));
router.get('/composer', userControllerInstance.getAllByComposer.bind(userControllerInstance));
router.get('/:id', userControllerInstance.getById.bind(userControllerInstance));
router.get('/composer/:id', userControllerInstance.getByNickName.bind(userControllerInstance));
router.post('/sendCode', userControllerInstance.checkGmail.bind(userControllerInstance), userControllerInstance.createRequestAuthenticationEmail.bind(userControllerInstance));
router.post('/signupForm', verifyEmailForm_middleware_1.default, userControllerInstance.signupForm.bind(userControllerInstance));
router.get('/permissionComposer', authVerifyToken_middleware_1.authenticationUser, userControllerInstance.permissionComposer.bind(userControllerInstance));
router.post('/upgradeComposer', 
// authenticationUser, // authentication administrator
userControllerInstance.AskForPermissionUpgradeComposer.bind(userControllerInstance));
router
    .route('/profile')
    .put(authVerifyToken_middleware_1.authenticationUser, userControllerInstance.updateProfileUser.bind(userControllerInstance));
exports.default = router;
//# sourceMappingURL=user.route.js.map