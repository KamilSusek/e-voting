"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
const Block_1 = __importDefault(require("./Block"));
class Blockchain {
    constructor(nodeId) {
        this.nodeId = nodeId;
        this.blockchain = new Array();
        this.pendingTransactionList = new Array();
        this.createGenesisBlock();
    }
    createGenesisBlock() {
        const block = new Block_1.default(this.blockchain.length, '0', 4, '0', 'empty');
        this.blockchain.push(block);
    }
    createNewBlock(nonce, prevHash, data) {
        const block = new Block_1.default(this.blockchain.length, '2020-01-02', nonce, this.getHash(this.blockchain[this.blockchain.length - 1]), data);
        this.blockchain.push(block);
        return block;
    }
    getHash(block) {
        return crypto_js_1.SHA256(block.toString()).toString();
    }
    mine(data) {
        const lastBlock = this.blockchain[this.blockchain.length - 1];
        const nonce = this.solveNonce(lastBlock.getNonce(), lastBlock.getPrevHash());
        this.createNewBlock(nonce, lastBlock.getPrevHash(), data);
    }
    setChain(chain) {
        this.blockchain = chain;
    }
    getChain() {
        return this.blockchain;
    }
    getChainLength() {
        return this.blockchain.length;
    }
    solveNonce(lastNonce, prevHash) {
        let nonce = 0;
        while (!this.isNonceValid(lastNonce, nonce, prevHash)) {
            nonce++;
        }
        return nonce;
    }
    isNonceValid(lastNonce, nonce, prevHash) {
        const attempt = `${lastNonce}${nonce}${prevHash}`;
        return crypto_js_1.SHA256(attempt)
            .toString()
            .startsWith('00000');
    }
    getNodeId() {
        return this.nodeId;
    }
}
exports.default = Blockchain;
//# sourceMappingURL=Blockchain.js.map