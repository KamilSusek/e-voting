"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIFFICULTY = 5;
class Block {
    constructor(index, timestamp, nonce, prevHash, data) {
        this.index = index;
        this.timestamp = timestamp;
        this.nonce = nonce;
        this.prevHash = prevHash;
        this.data = data;
    }
    toString() {
        return `${this.index}${this.timestamp}${this.nonce}${this.prevHash}${this.data}`;
    }
    getPrevHash() {
        return this.prevHash;
    }
    getNonce() {
        return this.nonce;
    }
}
exports.default = Block;
//# sourceMappingURL=Block.js.map