"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScore = void 0;
const BlockchainFacade_1 = __importDefault(require("../facade/BlockchainFacade"));
const blockchain = new BlockchainFacade_1.default();
function getScore(req, res) {
    const scores = blockchain.getScore();
    res.send(scores);
}
exports.getScore = getScore;
//# sourceMappingURL=ScoreController.js.map