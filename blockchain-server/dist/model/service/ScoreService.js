"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeConfig_1 = __importDefault(require("../config/NodeConfig"));
class ScoreService {
    constructor() {
        this.blockchain = NodeConfig_1.default.getInstance().getConsensusAlgorithm();
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
exports.default = ScoreService;
//# sourceMappingURL=ScoreService.js.map