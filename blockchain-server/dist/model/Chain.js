"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = __importDefault(require("./Block"));
class Chain {
    constructor() {
        this.chain = new Array();
        this.createGenesisBlock();
    }
    static getInstance() {
        if (!Chain.instance) {
            Chain.instance = new Chain();
        }
        return Chain.instance;
    }
    setChain(chain) {
        this.chain = chain;
    }
    getChain() {
        return this.chain;
    }
    getChainLength() {
        return this.chain.length;
    }
    addBlock(block) {
        this.chain.push(block);
    }
    createGenesisBlock() {
        const block = new Block_1.default(this.chain.length, '0', 4, '0', 'empty');
        this.chain.push(block);
    }
}
exports.default = Chain;
//# sourceMappingURL=Chain.js.map