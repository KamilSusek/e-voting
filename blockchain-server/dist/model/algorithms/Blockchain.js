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
        this.blockchain = Chain_1.default.getInstance();
    }
    createNewBlock(nonce, prevHash, data) {
        const blockchain = this.blockchain.getChain();
        const chainLength = blockchain.length;
        const date = Date.now().toString();
        const block = new Block_1.default(chainLength, date, nonce, prevHash, data);
        return block;
    }
    setChain(chain) {
        this.blockchain.setChain(chain);
    }
    getScore() {
        return this.blockchain.getChain();
    }
    getHash(block) {
        const inputWord = block.toString();
        const hash = crypto_js_1.SHA256(inputWord).toString();
        return hash;
    }
}
exports.default = Blockchain;
//# sourceMappingURL=Blockchain.js.map