"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("module-alias/register");
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const connect_db_1 = __importDefault(require("./database/connect.db"));
(0, dotenv_1.config)();
const PORT_SERVER = process.env.PORT_SERVER || 5000;
const app = (0, express_1.default)();
// use global middleware
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// connect Database
connect_db_1.default.connect();
app.use(`/api/${process.env.CURRENT_API_VERSION}`, index_route_1.default);
app.listen(PORT_SERVER, () => console.log(`App listening on port http://localhost:${PORT_SERVER}`));
