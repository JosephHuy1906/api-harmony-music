"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
async function ValidatePayload(payload, message, showError = false) {
    const validation = await new class_validator_1.Validator().validate(payload, {
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
}
exports.default = ValidatePayload;
