"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const index_route_1 = __importDefault(require("@/routes/index.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_db_1 = __importDefault(require("./database/connect.db"));
(0, dotenv_1.config)();
const PORT_SERVER = process.env.PORT_SERVER || 5000;
const app = (0, express_1.default)();
// use global middleware
const whitelist = ['http://localhost:3000', 'http://localhost:5173'];
app.use((0, cors_1.default)((req, callback) => {
    var _a;
    const corsOptions = { origin: false };
    if (whitelist.indexOf((_a = req.header('Origin')) !== null && _a !== void 0 ? _a : '') !== -1) {
        corsOptions.origin = true;
    }
    else {
        corsOptions.origin = false;
    }
    callback(null, Object.assign(Object.assign({}, corsOptions), { methods: [
            'GET',
            'HEAD',
            'POST',
            'PATCH',
            'PUT',
            'DELETE',
            'OPTIONS',
        ], credentials: true }));
}));
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)()); // process.env.COOKIE_SECRET
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// connect Database
connect_db_1.default.connect();
app.use(`/api/${process.env.CURRENT_API_VERSION}`, index_route_1.default);
app.listen(PORT_SERVER, () => console.log(`App listening on port http://localhost:${PORT_SERVER}`));
//# sourceMappingURL=index.js.map