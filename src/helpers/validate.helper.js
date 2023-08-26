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
const class_validator_1 = require("class-validator");
function ValidatePayload(payload, message, showError = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const validation = yield new class_validator_1.Validator().validate(payload, {
            enableDebugMessages: true,
            strictGroups: true,
        });
        if (validation.length > 0) {
            return {
                status: 400,
                message,
                success: false,
                errors: showError ? validation : undefined,
            };
        }
        return null;
    });
}
exports.default = ValidatePayload;
//# sourceMappingURL=validate.helper.js.map