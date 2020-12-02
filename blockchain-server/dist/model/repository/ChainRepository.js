"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = __importDefault(require("../entities/Block"));
class ChainRepository {
    constructor() {
        this.chain = new Array();
        this.createGenesisBlock();
    }
    static getInstance() {
        if (!ChainRepository.instance) {
            ChainRepository.instance = new ChainRepository();
        }
        return ChainRepository.instance;
    }
    getChain() {
        return this.chain;
    }
    setChain(chain) {
        this.chain = chain;
    }
    addBlock(block) {
        this.chain.push(block);
    }
    createGenesisBlock() {
        const block = new Block_1.default(this.chain.length, '0', 0, '0', 'genesis');
        this.chain.push(block);
    }
}
exports.default = ChainRepository;
//# sourceMappingURL=ChainRepository.js.map