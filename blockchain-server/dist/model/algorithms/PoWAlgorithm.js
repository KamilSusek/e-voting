"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blockchain_1 = __importDefault(require("./Blockchain"));
const crypto_js_1 = require("crypto-js");
class PoWBlockchain extends Blockchain_1.default {
    constructor() {
        super();
    }
    mine(data) {
        const blockchain = this.blockchain.getChain();
        const lastBlock = blockchain[blockchain.length - 1];
        const nonce = this.solveNonce(lastBlock.nonce, lastBlock.prevHash);
        const newBlock = this.createNewBlock(nonce, lastBlock.prevHash, data);
        this.blockchain.addBlock(newBlock);
    }
    getSyncValue() {
        return this.blockchain.getChain().length;
    }
    synchronize(syncValue) {
        if (this.blockchain.getChain().length < syncValue) {
            return true;
        }
        else {
            return false;
        }
    }
    solveNonce(lastNonce, prevHash) {
        let nonce = 0;
        while (!this.validateNonce(lastNonce, nonce, prevHash)) {
            nonce++;
        }
        return nonce;
    }
    validateNonce(lastNonce, nonce, prevHash) {
        const attempt = `${lastNonce}${nonce}${prevHash}`;
        const hash = crypto_js_1.SHA256(attempt).toString();
        const isValid = hash.startsWith('000');
        return isValid;
    }
}
exports.default = PoWBlockchain;
//# sourceMappingURL=PoWAlgorithm.js.map