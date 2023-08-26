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
const index_instance_1 = require("@/instances/index.instance");
function verificationEmailWithForm(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            if (!payload.email || !payload.verificationCode)
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'BAD_REQUEST_PAYLOAD_EMPTY',
                });
            const collectionUser = yield index_instance_1.userModel.getByEmail(payload.email);
            if (collectionUser &&
                collectionUser.email === payload.email &&
                !collectionUser.isRegistrationForm)
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'GMAIL_ALREADY_EXISTS',
                });
            const currentGmail = yield index_instance_1.accountPendingVerifyModel.getByEmail(payload.email);
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
    });
}
exports.default = verificationEmailWithForm;
//# sourceMappingURL=verifyEmailForm.middleware.js.map