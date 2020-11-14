"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blockchain_1 = __importDefault(require("../models/blockchain/Blockchain"));
const BlockchainRepository_1 = __importDefault(require("../repository/BlockchainRepository"));
class BlockchainService {
    constructor() {
        this.repo = BlockchainRepository_1.default.getInstance();
    }
    createNewChain(chainName) {
        if (chainName) {
            const chains = this.repo.findAll();
            chains.forEach((chain, index) => {
                if (chain.chainName === chainName) {
                    return new Promise((resolve, reject) => {
                        const message = "Chain already exists.";
                        reject(message);
                    });
                }
            });
            return new Promise((resolve, reject) => {
                const message = "Success";
                this.repo.saveChain(new Blockchain_1.default(chainName));
                resolve(message);
            });
        }
        else {
            return new Promise((resolve, reject) => {
                const message = "Chain already exists.";
                reject(message);
            });
        }
    }
    pushNewBlock(data, chainName) {
        if (chainName) {
            if (this.repo.saveBlock(data, chainName)) {
                return new Promise((resolve, reject) => {
                    resolve("ok");
                });
            }
            else {
                return new Promise((resolve, reject) => {
                    const errorMessage = "Invalid chain name.";
                    reject(errorMessage);
                });
            }
        }
        else {
            return new Promise((resolve, reject) => {
                const errorMessage = "Invalid chain name.";
                reject(errorMessage);
            });
        }
    }
    // removeChain(chainName: string) {}
    getAllChains() {
        const chains = this.repo.findAll();
        return chains;
    }
}
exports.default = BlockchainService;
//# sourceMappingURL=BlockchainService.js.map