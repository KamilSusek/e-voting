"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
const Chain_1 = __importDefault(require("../Chain"));
const Block_1 = __importDefault(require("./Block"));
class Blockchain {
    constructor() {
        this.chain = Chain_1.default.getInstance();
    }
    mine(data) {
        const blockchain = this.chain.getChain();
        const lastBlock = blockchain[blockchain.length - 1];
        // const nonce = this.solveNonce(lastBlock.getNonce(), lastBlock.getPrevHash())
        this.createNewBlock(0, lastBlock.getPrevHash(), data);
    }
    createNewBlock(nonce, prevHash, data) {
        const blockchain = this.chain.getChain();
        const block = new Block_1.default(blockchain.length, '2020-01-02', nonce, this.getHash(blockchain[blockchain.length - 1]), data);
        return block;
    }
    solveNonce(lastNonce, prevHash) {
        let nonce = 0;
        while (!this.isNonceValid(lastNonce, nonce, prevHash)) {
            nonce++;
        }
        return nonce;
    }
    getHash(block) {
        return crypto_js_1.SHA256(block.toString()).toString();
    }
    isNonceValid(lastNonce, nonce, prevHash) {
        const attempt = `${lastNonce}${nonce}${prevHash}`;
        return crypto_js_1.SHA256(attempt)
            .toString()
            .startsWith('00000');
    }
}
exports.default = Blockchain;
//# sourceMappingURL=Blockchain.js.map