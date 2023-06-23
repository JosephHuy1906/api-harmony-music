"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = __importDefault(require("../database/schemas/user.schema"));
class UserModel {
    static async getById(_id) {
        const user = await user_schema_1.default.findById(_id);
        return user;
    }
    static async getByEmail(email) {
        const user = await user_schema_1.default.findOne({ email });
        return user;
    }
    static async create(payload) {
        const created = await user_schema_1.default.create(payload);
        return created;
    }
    static async updateById(_id, payload) {
        const updated = await user_schema_1.default.findByIdAndUpdate(_id, payload);
        return updated;
    }
}
exports.default = UserModel;
