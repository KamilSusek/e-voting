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
    getIndex() {
        return this.index;
    }
    getTimestamp() {
        return this.timestamp;
    }
    getNonce() {
        return this.nonce;
    }
    getPrevHash() {
        return this.prevHash;
    }
    getData() {
        return this.data;
    }
    toString() {
        return `${this.index}${this.timestamp}${this.nonce}${this.prevHash}${this.data}`;
    }
}
exports.default = Block;
//# sourceMappingURL=Block.js.map