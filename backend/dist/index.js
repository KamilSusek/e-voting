"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authentication_1 = __importDefault(require("./routes/authentication"));
const users_1 = __importDefault(require("./routes/users"));
const elections_1 = __importDefault(require("./routes/elections"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
dotenv_1.default.config();
const port = 8080;
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
app.use("/auth", authentication_1.default);
app.use("/", users_1.default);
app.use("/", elections_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map