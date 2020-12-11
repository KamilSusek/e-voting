"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blockchain_1 = __importDefault(require("../Blockchain"));
class PoAAlgorithm extends Blockchain_1.default {
    constructor() {
        super();
        this.authorityFactor = 100;
    }
    mine(data) {
        const blockchain = this.blockchain.getChain();
        const lastBlock = blockchain[blockchain.length - 1];
        const newBlock = this.createNewBlock(0, lastBlock, data);
        this.blockchain.addBlock(newBlock);
        this.authorityFactor++;
    }
    getSyncValue() {
        return this.authorityFactor;
    }
    synchronize(auth) {
        if (this.authorityFactor < auth) {
            return false;
        }
        else {
            return true;
        }
    }
}
exports.default = PoAAlgorithm;
//# sourceMappingURL=PoAAlgorithm.js.map