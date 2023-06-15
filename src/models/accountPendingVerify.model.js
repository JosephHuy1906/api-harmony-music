"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountPendingVerify_schema_1 = __importDefault(require("@/database/schemas/accountPendingVerify.schema"));
class AccountPendingVerifyModel {
    static async getByEmail(email) {
        const account = await accountPendingVerify_schema_1.default.findOne({ email });
        return account;
    }
    static async create(payload) {
        const created = await accountPendingVerify_schema_1.default.create(payload);
        return created;
    }
    static async deleteById(_id) {
        const deleted = await accountPendingVerify_schema_1.default.findByIdAndDelete(_id);
        return deleted;
    }
}
exports.default = AccountPendingVerifyModel;
