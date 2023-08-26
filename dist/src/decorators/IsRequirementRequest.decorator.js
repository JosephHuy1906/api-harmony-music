"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsRequirementEmail = exports.IsRequirementReq = exports.IsRequirementTypeId = void 0;
const regex_util_1 = require("../utils/regex.util");
function IsRequirementTypeId(key, scope) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const [req, res, next] = args;
            try {
                const payload = req[scope];
                switch (typeof key) {
                    case 'string':
                        const condition = (0, regex_util_1.regexUuidV4Validation)(payload[key]);
                        return condition
                            ? originalMethod.apply(this, args)
                            : res.status(400).json({
                                status: 400,
                                success: false,
                                message: 'BAD_REQUEST_REQUIRE_ID_TYPE',
                            });
                    case 'object':
                        const mapping = [];
                        let flagInValidArray = [];
                        const reducePayload = Object.entries(payload).reduce((acc, cur, index) => {
                            const [keyId, value] = cur;
                            if (key.indexOf(keyId) !== -1) {
                                acc[keyId] = value;
                                flagInValidArray.push(Array.isArray(value)
                                    ? value.length > 0
                                    : !!value);
                            }
                            return acc;
                        }, {});
                        if (flagInValidArray.includes(false))
                            return res.status(400).json({
                                status: 400,
                                success: false,
                                message: 'BAD_REQUEST_REQUIRE_ID_TYPE',
                            });
                        Object.entries(reducePayload).forEach(([keyId, value]) => {
                            if (key.indexOf(keyId) !== -1) {
                                if (typeof value === 'string' &&
                                    value.trim().startsWith(`[`)) {
                                    const parseFormDataStringId = JSON.parse(value);
                                    parseFormDataStringId.forEach((id) => {
                                        mapping.push(id.trim());
                                    });
                                }
                                else if (Array.isArray(value)) {
                                    value.forEach((id) => mapping.push(id.trim()));
                                }
                                else {
                                    mapping.push(value.trim());
                                }
                            }
                        });
                        const isPassed = mapping.every((currentValue) => (0, regex_util_1.regexUuidV4Validation)(currentValue));
                        return isPassed
                            ? originalMethod.apply(this, args)
                            : res.status(400).json({
                                status: 400,
                                success: false,
                                message: 'BAD_REQUEST_REQUIRE_ID_TYPE',
                            });
                    default:
                        return res.status(400).json({
                            status: 400,
                            success: false,
                            message: 'BAD_REQUEST_REQUIRE_ID_TYPE',
                        });
                }
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
                const payload = req[scope];
                switch (typeof key) {
                    case 'string':
                        const condition = key in payload && !!payload[key];
                        return condition
                            ? originalMethod.apply(this, args)
                            : res.status(400).json({
                                status: 400,
                                success: false,
                                message: `BAD_REQUEST_REQUIRE_NOT_NULL_"${key}"`,
                            });
                    case 'object':
                        const isPassed = key.every((currentValue) => currentValue in payload &&
                            !!payload[currentValue]);
                        return isPassed
                            ? originalMethod.apply(this, args)
                            : res.status(400).json({
                                status: 400,
                                success: false,
                                message: `BAD_REQUEST_REQUIRE_NOT_NULL_"${key}"`,
                            });
                    default:
                        return res.status(400).json({
                            status: 400,
                            success: false,
                            message: `BAD_REQUEST_REQUIRE_NOT_NULL_"${key}"`,
                        });
                }
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
function IsRequirementEmail(field) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, ...args) {
            const email = req.body[field];
            const trimEmail = email !== null && email !== void 0 ? email : '';
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
//# sourceMappingURL=IsRequirementRequest.decorator.js.map