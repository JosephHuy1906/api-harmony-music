"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathFromSystem = void 0;
const path_1 = __importDefault(require("path"));
function pathFromSystem(paths, plaform) {
    const dirname = __dirname;
    if (plaform === 'win32') {
        const dirnameLinux = path_1.default.posix.join(dirname.split(path_1.default.sep).join(path_1.default.posix.sep));
        const arr = dirnameLinux.split('/');
        const index = arr.indexOf("src");
        const prefix = arr.slice(0, index).join("/");
        const linuxPath = path_1.default.posix.join(paths.split(path_1.default.sep).join(path_1.default.posix.sep)).split(prefix + '/')[1];
        return linuxPath;
    }
    else {
        const dirnameLinux = __dirname;
        const arr = dirnameLinux.split('/');
        const index = arr.indexOf("src");
        const prefix = arr.slice(0, index).join("/");
        const linuxPath = paths.split(prefix + '/')[1];
        return linuxPath;
    }
}
exports.pathFromSystem = pathFromSystem;
