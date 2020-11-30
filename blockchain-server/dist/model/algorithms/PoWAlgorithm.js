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
        const blockchain = this.chain.getChain();
        const lastBlock = blockchain[blockchain.length - 1];
        const nonce = this.solveNonce(lastBlock.getNonce(), lastBlock.getPrevHash());
        const newBlock = this.createNewBlock(nonce, lastBlock.getPrevHash(), data);
        this.chain.addBlock(newBlock);
    }
    getSyncValue() {
        return this.chain.getChainLength();
    }
    synchronize(syncValue) {
        if (this.chain.getChain().length < syncValue) {
            return true;
        }
        else {
            return false;
        }
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
            .startsWith('000');
    }
}
exports.default = PoWBlockchain;
//# sourceMappingURL=PoWAlgorithm.js.map