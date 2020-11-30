"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
const Block_1 = __importDefault(require("../Block"));
const Chain_1 = __importDefault(require("../Chain"));
class Blockchain {
    constructor() {
        this.chain = Chain_1.default.getInstance();
    }
    setChain(chain) {
        this.chain.setChain(chain);
    }
    createNewBlock(nonce, prevHash, data) {
        const blockchain = this.chain.getChain();
        const block = new Block_1.default(blockchain.length, Date.now().toString(), nonce, this.getHash(blockchain[blockchain.length - 1]), data);
        return block;
    }
    getScore() {
        return this.chain.getChain();
    }
    getHash(block) {
        return crypto_js_1.SHA256(block.toString()).toString();
    }
}
exports.default = Blockchain;
//# sourceMappingURL=Blockchain.js.map