"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountPendingVerify_model_1 = __importDefault(require("@/models/accountPendingVerify.model"));
const user_model_1 = __importDefault(require("@/models/user.model"));
async function verificationEmailWithForm(req, res, next) {
    try {
        const payload = req.body;
        if (!payload.email || !payload.verificationCode)
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'BAD_REQUEST_PAYLOAD_EMPTY',
            });
        const collectionUser = await user_model_1.default.getByEmail(payload.email);
        if (collectionUser &&
            collectionUser.email === payload.email &&
            !collectionUser.isRegistrationForm)
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'GMAIL_ALREADY_EXISTS',
            });
        const currentGmail = await accountPendingVerify_model_1.default.getByEmail(payload.email);
        if (!currentGmail)
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'BAD_REQUEST',
            });
        const isVerify = payload.verificationCode === currentGmail.verificationCode;
        if (!isVerify)
            return res.status(403).json({
                status: 403,
                success: false,
                message: 'VERIFICATION_CODE_NOT_MATCH',
            });
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}
exports.default = verificationEmailWithForm;
