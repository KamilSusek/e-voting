"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const peers_1 = __importDefault(require("./routes/peers"));
const blockchain_1 = __importDefault(require("./routes/blockchain"));
const score_1 = __importDefault(require("./routes/score"));
const blockchain_2 = require("./routes/blockchain");
const HTTP_PORT = process.env.PORT || 3001;
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(peers_1.default);
app.use(blockchain_1.default);
app.use(score_1.default);
app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}.`);
    blockchain_2.synchronizeOnInit();
});
/**
 * npm run start
 * $env:HTTP_PORT = 3002; $env:P2P_PORT = 5002; $env:PEERS = 'ws://localhost:5001'; npm run start
 * $env:HTTP_PORT = 3003; $env:P2P_PORT = 5003; $env:PEERS = 'ws://localhost:5002,ws://localhost:5001'; npm run start
 */
//# sourceMappingURL=index.js.map