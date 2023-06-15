"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsRequirementEmail = exports.IsRequirementFiles = exports.IsRequirementReq = exports.IsRequirementTypeId = void 0;
const regex_util_1 = require("@/utils/regex.util");
const deleteFile_helper_1 = __importDefault(require("@/helpers/deleteFile.helper"));
function IsRequirementTypeId(key, scope) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const [req, res, next] = args;
            try {
                let payload = req.body;
                switch (scope) {
                    case 'body':
                        payload = req.body;
                        break;
                    case 'params':
                        payload = req.params;
                        break;
                    case 'query':
                        payload = req.query;
                        break;
                    default:
                        throw new Error('Required type request');
                }
                if (typeof key === 'string') {
                    if ((0, regex_util_1.regexUuidV4Validation)(payload[key])) {
                        return originalMethod.apply(this, args);
                    }
                }
                else {
                    const mapping = [];
                    Object.entries(payload).forEach(([keyId, value]) => {
                        if (key.indexOf(keyId) !== -1) {
                            mapping.push(value.trim());
                        }
                    });
                    const isPassed = mapping.every((currentValue) => (0, regex_util_1.regexUuidV4Validation)(currentValue));
                    if (isPassed) {
                        const result = originalMethod.apply(this, args);
                        return result;
                    }
                }
                const files = req.files;
                if (Object.keys(files).length > 0) {
                    for (const keyFile in files) {
                        (0, deleteFile_helper_1.default)(files[keyFile][0]);
                    }
                }
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'BAD_REQUEST_REQUIRE_ID_TYPE',
                });
            }
            catch (error) {
                console.log(error);
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'BAD_REQUEST_REQUIRE_ID_TYPE',
                });
            }
        };
        return descriptor;
    };
}
exports.IsRequirementTypeId = IsRequirementTypeId;
function IsRequirementReq(key, scope) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const [req, res, next] = args;
            try {
                let payload = req.body;
                switch (scope) {
                    case 'body':
                        payload = req.body;
                        break;
                    case 'params':
                        payload = req.params;
                        break;
                    case 'query':
                        payload = req.query;
                        break;
                    default:
                        throw new Error('Required type request');
                }
                if (typeof key === 'string') {
                    if (key in payload && !!payload[key]) {
                        const result = originalMethod.apply(this, args);
                        return result;
                    }
                }
                else {
                    const isPassed = key.every((currentValue) => currentValue in payload && !!payload[currentValue]);
                    if (isPassed) {
                        const result = originalMethod.apply(this, args);
                        return result;
                    }
                }
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: `BAD_REQUEST_REQUIRE_NOT_NULL_"${key}"`,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: `BAD_REQUEST_REQUIRE_NOT_NULL_"${key}"`,
                });
            }
        };
        return descriptor;
    };
}
exports.IsRequirementReq = IsRequirementReq;
function IsRequirementFiles(fields) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const [req, res, next] = args;
            try {
                const files = req.files;
                const firstCondition = fields.every((file) => Object.keys(files).indexOf(file) !== -1);
                if (firstCondition) {
                    return originalMethod.apply(this, args);
                }
                else {
                    const keyArray = Object.keys(files);
                    keyArray.forEach((key) => {
                        const file = files[key];
                        (0, deleteFile_helper_1.default)(file[0]);
                    });
                    return res.status(400).json({
                        status: 400,
                        success: false,
                        message: 'BAD_REQUEST_UPLOAD_FILE',
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'BAD_REQUEST_UPLOAD_FILE',
                });
            }
        };
        return descriptor;
    };
}
exports.IsRequirementFiles = IsRequirementFiles;
function IsRequirementEmail(field) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, ...args) {
            const email = req.body[field];
            const trimEmail = email ?? '';
            if (trimEmail && (0, regex_util_1.regexEmail)(email)) {
                return originalMethod.apply(this, [req, res, ...args]);
            }
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'BAD_REQUEST_FORMAT_EMAIL_INVALID',
            });
        };
    };
}
exports.IsRequirementEmail = IsRequirementEmail;
