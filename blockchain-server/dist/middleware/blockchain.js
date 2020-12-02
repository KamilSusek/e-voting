"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mine = exports.synchronizeChain = exports.synchronize = exports.synchronizeNode = exports.distribute = exports.getServerInfo = void 0;
const PeersService_1 = __importDefault(require("../model/service/PeersService"));
const BlockchainService_1 = __importDefault(require("../model/service/BlockchainService"));
const ScoreService_1 = __importDefault(require("../model/service/ScoreService"));
const RequiredBodyNotFoundError_1 = __importDefault(require("../model/errors/product/RequiredBodyNotFoundError"));
const blockchainService = new BlockchainService_1.default();
const peersService = new PeersService_1.default();
const scoreService = new ScoreService_1.default();
function getServerInfo(req, res) {
    /** Stored peers plus current peer. */
    const nodes = peersService.getAllPeers().length + 1;
    const addedBlocks = scoreService.getScore().length;
    const info = {
        addedBlocks,
        nodes
    };
    res.send(info);
}
exports.getServerInfo = getServerInfo;
function distribute(req, res) {
    const { candidate_name } = req.body;
    if (candidate_name) {
        const vote = { candidate_name };
        blockchainService.distributeVote(vote);
        blockchainService.mine(candidate_name);
        res.send();
    }
    else {
        const error = new RequiredBodyNotFoundError_1.default();
        const { statusCode, errorMessage } = error.getError();
        res.status(statusCode).send(errorMessage);
    }
}
exports.distribute = distribute;
function synchronizeNode(req, res) {
    const { chain, syncValue } = req.body;
    if (chain && syncValue) {
        blockchainService.synchronizeNode(syncValue, chain);
        res.send();
    }
    else {
        const error = new RequiredBodyNotFoundError_1.default();
        const { statusCode, errorMessage } = error.getError();
        res.status(statusCode).send(errorMessage);
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
    const { candidate_name } = req.body;
    if (candidate_name) {
        blockchainService.mine(candidate_name);
        res.send();
    }
    else {
        const error = new RequiredBodyNotFoundError_1.default();
        const { statusCode, errorMessage } = error.getError();
        res.status(statusCode).send(errorMessage);
    }
}
exports.mine = mine;
//# sourceMappingURL=blockchain.js.map