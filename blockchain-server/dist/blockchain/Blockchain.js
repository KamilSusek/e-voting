"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = __importDefault(require("./Block"));
class Blockchain {
    constructor(chainName) {
        this.chain = [Block_1.default.generateGenesisBlock()];
        this.chainName = chainName;
    }
    addNewBlock(data) {
        const previousBlock = this.chain[this.chain.length - 1];
        const block = Block_1.default.mineBlock(previousBlock, data);
        this.chain.push(block);
        return block;
    }
    isChainIntegral(chain) {
        if (chain[0] !== Block_1.default.generateGenesisBlock())
            return false;
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const previousBlock = chain[i - 1];
            if (block.previousHash !== previousBlock.hash ||
                block.hash !== Block_1.default.calculateBlockHash(block)) {
                return false;
            }
        }
        return true;
    }
    swapChain(newChain) {
        if (newChain.length <= this.chain.length) {
            return;
        }
        else if (!this.isChainIntegral(newChain)) {
            return;
        }
        this.chain = newChain;
    }
}
exports.default = Blockchain;
//# sourceMappingURL=Blockchain.js.map