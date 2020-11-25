"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.synchronizeOnInit = void 0;
const express_1 = __importDefault(require("express"));
const BlockchainController_1 = require("../middleware/BlockchainController");
const blockchain = express_1.default.Router();
blockchain.post('/distribute', BlockchainController_1.distribute);
blockchain.post('/node/synchronize', BlockchainController_1.synchronizeNode);
blockchain.post('/synchronize', BlockchainController_1.synchronizeChain);
blockchain.post('/mine', BlockchainController_1.mine);
function synchronizeOnInit() {
    BlockchainController_1.synchronize();
}
exports.synchronizeOnInit = synchronizeOnInit;
exports.default = blockchain;
//# sourceMappingURL=blockchain.js.map