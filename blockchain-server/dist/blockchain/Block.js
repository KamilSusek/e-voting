"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
const DIFFICULTY = 3;
class Block {
    constructor(timestamp, previousHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }
    static generateGenesisBlock() {
        return new this("none", "none", "none", "none", 2, DIFFICULTY);
    }
    static hashBlock(timestamp, previousHash, data, nonce, difficulty) {
        return crypto_js_1.SHA256(`${timestamp}${previousHash}${data}${nonce}${difficulty}`).toString();
    }
    static mineBlock(prevoiusBlock, data) {
        const timestamp = Date.now();
        let hash;
        const prevoiusHash = prevoiusBlock.hash;
        let nonce = 0;
        hash = Block.hashBlock(timestamp, prevoiusHash, data, nonce, DIFFICULTY);
        while (hash.substring(0, DIFFICULTY) !== Array(DIFFICULTY + 1).join("0")) {
            nonce++;
            hash = Block.hashBlock(timestamp, prevoiusHash, data, nonce, DIFFICULTY);
        }
        return new this(timestamp, prevoiusHash, hash, data, 2, DIFFICULTY);
    }
    static calculateBlockHash(block) {
        const { timestamp, previousHash, data, nonce, difficulty } = block;
        return Block.hashBlock(timestamp, previousHash, data, nonce, difficulty);
    }
}
exports.default = Block;
//# sourceMappingURL=Block.js.map