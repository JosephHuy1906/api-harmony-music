"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsRequirementTypeId = exports.IsRequirementEmail = exports.IsRequirementFiles = exports.IsRequirementReq = exports.IsGenerateCollection = void 0;
var IsGenerateCollection_decorator_1 = require("./IsGenerateCollection.decorator");
Object.defineProperty(exports, "IsGenerateCollection", { enumerable: true, get: function () { return __importDefault(IsGenerateCollection_decorator_1).default; } });
var IsRequirementRequest_decorator_1 = require("./IsRequirementRequest.decorator");
Object.defineProperty(exports, "IsRequirementReq", { enumerable: true, get: function () { return IsRequirementRequest_decorator_1.IsRequirementReq; } });
Object.defineProperty(exports, "IsRequirementFiles", { enumerable: true, get: function () { return IsRequirementRequest_decorator_1.IsRequirementFiles; } });
Object.defineProperty(exports, "IsRequirementEmail", { enumerable: true, get: function () { return IsRequirementRequest_decorator_1.IsRequirementEmail; } });
Object.defineProperty(exports, "IsRequirementTypeId", { enumerable: true, get: function () { return IsRequirementRequest_decorator_1.IsRequirementTypeId; } });
