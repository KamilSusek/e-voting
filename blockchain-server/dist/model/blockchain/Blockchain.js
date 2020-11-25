"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
const Block_1 = __importDefault(require("./Block"));
class Blockchain {
    constructor() {
        this.blockchain = new Array();
        this.createGenesisBlock();
    }
    static getInstance() {
        if (!Blockchain.instance) {
            Blockchain.instance = new Blockchain();
        }
        return Blockchain.instance;
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
    setChain(chain) {
        this.blockchain = chain;
    }
    getHash(block) {
        return crypto_js_1.SHA256(block.toString()).toString();
    }
    getChain() {
        return this.blockchain;
    }
    getChainLength() {
        return this.blockchain.length;
    }
    mine(data) {
        const lastBlock = this.blockchain[this.blockchain.length - 1];
        const nonce = this.solveNonce(lastBlock.getNonce(), lastBlock.getPrevHash());
        this.createNewBlock(nonce, lastBlock.getPrevHash(), data);
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
}
exports.default = Blockchain;
//# sourceMappingURL=Blockchain.js.map