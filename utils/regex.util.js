"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexEmail = exports.regexUuidV4Validation = void 0;
function regexUuidV4Validation(id) {
    const regex = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;
    return regex.test(id);
}
exports.regexUuidV4Validation = regexUuidV4Validation;
function regexEmail(email) {
    const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
    return regexEmail.test(email);
}
exports.regexEmail = regexEmail;
