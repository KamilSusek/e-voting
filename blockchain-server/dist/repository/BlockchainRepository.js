"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Singleton Repository class.
 */
class BlockchainRepository {
    constructor() {
        this.chains = new Array();
    }
    static getInstance() {
        if (!BlockchainRepository.instance) {
            BlockchainRepository.instance = new BlockchainRepository();
        }
        return BlockchainRepository.instance;
    }
    saveChain(blockchain) {
        this.chains.push(blockchain);
    }
    saveBlock(data, chainName) {
        for (let i = 0; i < this.chains.length; i++) {
            if (this.chains[i].chainName === chainName) {
                this.chains[i].addNewBlock(data);
                return true;
            }
        }
        return false;
    }
    findAll() {
        return this.chains;
    }
    findByName(name) {
        for (const it of this.chains) {
            if (it.chainName === name) {
                return it;
            }
        }
        return null;
    }
}
exports.default = BlockchainRepository;
//# sourceMappingURL=BlockchainRepository.js.map