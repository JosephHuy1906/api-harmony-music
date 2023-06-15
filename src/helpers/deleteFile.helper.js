"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function handleDeleteFile(file) {
    try {
        if (file) {
            fs_1.default.unlink(file.path, (err) => {
                if (err)
                    throw new Error(JSON.stringify(err));
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = handleDeleteFile;
