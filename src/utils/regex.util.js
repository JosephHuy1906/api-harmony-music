"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexEmail = exports.regexUuidV4Validation = void 0;
function regexUuidV4Validation(id) {
    const regex = /^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$/;
    return regex.test(id);
}
exports.regexUuidV4Validation = regexUuidV4Validation;
function regexEmail(email) {
    const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
    return regexEmail.test(email);
}
exports.regexEmail = regexEmail;
//# sourceMappingURL=regex.util.js.map