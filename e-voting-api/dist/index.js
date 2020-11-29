"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const voter_1 = __importDefault(require("./routes/voter"));
const election_1 = __importDefault(require("./routes/election"));
const candidate_1 = __importDefault(require("./routes/candidate"));
const auth_1 = __importDefault(require("./routes/auth"));
const PORT = process.env.PORT;
const app = express_1.default();
app.use(body_parser_1.default());
app.use(cors_1.default());
// Routes
app.use(auth_1.default);
app.use(voter_1.default);
app.use(election_1.default);
app.use(candidate_1.default);
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
//# sourceMappingURL=index.js.map