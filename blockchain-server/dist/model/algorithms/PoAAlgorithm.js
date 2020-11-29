"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
const Block_1 = __importDefault(require("../blockchain/Block"));
const Chain_1 = __importDefault(require("../Chain"));
const Blockchain_1 = __importDefault(require("./Blockchain"));
class PoAAlgorithm extends Blockchain_1.default {
    constructor() {
        super();
        this.chain = Chain_1.default.getInstance();
        this.authorityFactor = 100;
    }
    mine(data) {
        const blockchain = this.chain.getChain();
        const lastBlock = blockchain[blockchain.length - 1];
        const newBlock = this.createNewBlock(0, lastBlock.getPrevHash(), data);
        this.chain.addBlock(newBlock);
        this.authorityFactor++;
    }
    getScore() {
        return this.chain.getChain();
    }
    setChain(chain) {
        this.chain.setChain(chain);
    }
    createNewBlock(nonce, prevHash, data) {
        const blockchain = this.chain.getChain();
        const block = new Block_1.default(blockchain.length, '2020-01-02', nonce, this.getHash(blockchain[blockchain.length - 1]), data);
        return block;
    }
    getHash(block) {
        return crypto_js_1.SHA256(block.toString()).toString();
    }
}
exports.default = PoAAlgorithm;
//# sourceMappingURL=PoAAlgorithm.js.map