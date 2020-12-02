"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PoWAlgorithm_1 = __importDefault(require("../model/strategy/algorithms/PoWAlgorithm"));
class ScoreFacade {
    constructor() {
        this.blockchain = new PoWAlgorithm_1.default();
    }
    getScore() {
        const chain = this.blockchain.getScore();
        const resultsArray = new Array();
        for (const block of chain) {
            const data = block.data;
            resultsArray.push(data);
        }
        return resultsArray;
    }
    calculateResuts() {
        const chain = this.blockchain.getScore();
        const results = new Array();
        for (const item of chain) {
            const block = item.data;
            results.push(block);
        }
        return results;
    }
}
exports.default = ScoreFacade;
//# sourceMappingURL=ScoreFacade.js.map