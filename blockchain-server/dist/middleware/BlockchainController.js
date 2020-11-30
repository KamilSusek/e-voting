"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mine = exports.synchronizeChain = exports.synchronize = exports.synchronizeNode = exports.distribute = exports.getServerInfo = void 0;
const BlockchainFacade_1 = __importDefault(require("../facade/BlockchainFacade"));
const blockchain = new BlockchainFacade_1.default();
function getServerInfo(req, res) {
    const nodes = blockchain.getAllPeers().length + 1;
    const info = {
        addedBlocks: blockchain.getScore().length,
        nodes
    };
    res.send(info);
}
exports.getServerInfo = getServerInfo;
function distribute(req, res) {
    const { candidate_name } = req.body;
    const vote = { candidate_name };
    blockchain.distributeVote(vote);
    blockchain.mine(candidate_name);
    res.send();
}
exports.distribute = distribute;
function synchronizeNode(req, res) {
    const { chain, syncValue } = req.body;
    if (chain && syncValue) {
        blockchain.synchronizeNode(syncValue, chain);
        res.send();
    }
    else {
        res.status(400).send('Some of the provided params do not exist.');
    }
}
exports.synchronizeNode = synchronizeNode;
function synchronize() {
    blockchain.synchronizeOnInit();
}
exports.synchronize = synchronize;
function synchronizeChain(req, res) {
    blockchain.synchronizeChain();
    res.send();
}
exports.synchronizeChain = synchronizeChain;
function mine(req, res) {
    console.log(req.body);
    const { candidate_name } = req.body;
    blockchain.mine(candidate_name);
    res.send();
}
exports.mine = mine;
//# sourceMappingURL=BlockchainController.js.map