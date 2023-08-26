"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const client_s3_1 = require("@aws-sdk/client-s3");
const s3Client = new client_s3_1.S3Client({
    region: (_a = process.env.AWS_S3_BUCKET_REGION) !== null && _a !== void 0 ? _a : '',
    credentials: {
        accessKeyId: (_b = process.env.AWS_S3_ACCESS_KEY) !== null && _b !== void 0 ? _b : '',
        secretAccessKey: (_c = process.env.AWS_S3_SECRET_KEY) !== null && _c !== void 0 ? _c : '',
    },
});
exports.default = s3Client;
//# sourceMappingURL=s3.config.js.map