"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function handleEnvironment() {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
        ORIGIN: isProduction
            ? 'https://harmony-psi.vercel.app/'
            : 'http://localhost:5000',
        PREFIX: 'api',
        VERSION: 'v1',
        CLIENT_URL: isProduction
            ? 'https://harmony-psi.vercel.app/'
            : 'http://localhost:3000/',
        IS_PRODUCTION: isProduction,
        DOMAIN_CLIENT: isProduction ? 'harmony-psi.vercel.app' : 'localhost',
    };
}
exports.environment = handleEnvironment();
//# sourceMappingURL=environment.js.map