"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mine = exports.synchronizeChain = exports.synchronize = exports.synchronizeNode = exports.distribute = exports.getServerInfo = void 0;
const PeersService_1 = __importDefault(require("../model/service/PeersService"));
const BlockchainService_1 = __importDefault(require("../model/service/BlockchainService"));
const ScoreService_1 = __importDefault(require("../model/service/ScoreService"));
const blockchainService = new BlockchainService_1.default();
const peersService = new PeersService_1.default();
const scoreService = new ScoreService_1.default();
function getServerInfo(req, res) {
    const nodes = peersService.getAllPeers().length + 1;
    const info = {
        addedBlocks: scoreService.getScore().length,
        nodes
    };
    res.send(info);
}
exports.getServerInfo = getServerInfo;
function distribute(req, res) {
    const { candidate_name } = req.body;
    const vote = { candidate_name };
    blockchainService.distributeVote(vote);
    blockchainService.mine(candidate_name);
    res.send();
}
exports.distribute = distribute;
function synchronizeNode(req, res) {
    const { chain, syncValue } = req.body;
    if (chain && syncValue) {
        blockchainService.synchronizeNode(syncValue, chain);
        res.send();
    }
    else {
        res.status(400).send('Some of the provided params do not exist.');
    }
}
exports.synchronizeNode = synchronizeNode;
function synchronize() {
    blockchainService.synchronizeOnInit();
}
exports.synchronize = synchronize;
function synchronizeChain(req, res) {
    blockchainService.synchronizeChain();
    res.send();
}
exports.synchronizeChain = synchronizeChain;
function mine(req, res) {
    console.log(req.body);
    const { candidate_name } = req.body;
    blockchainService.mine(candidate_name);
    res.send();
}
exports.mine = mine;
//# sourceMappingURL=BlockchainController.js.map