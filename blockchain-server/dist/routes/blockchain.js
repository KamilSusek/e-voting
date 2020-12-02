"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.synchronizeOnInit = void 0;
const express_1 = __importDefault(require("express"));
const blockchain_1 = require("../middleware/blockchain");
const blockchain = express_1.default.Router();
blockchain.post('/distribute', blockchain_1.distribute);
blockchain.post('/node/synchronize', blockchain_1.synchronizeNode);
blockchain.post('/synchronize', blockchain_1.synchronizeChain);
blockchain.post('/mine', blockchain_1.mine);
blockchain.get('/info', blockchain_1.getServerInfo);
function synchronizeOnInit() {
    blockchain_1.synchronize();
}
exports.synchronizeOnInit = synchronizeOnInit;
exports.default = blockchain;
//# sourceMappingURL=blockchain.js.map