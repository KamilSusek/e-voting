"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsensusAlogrithm = void 0;
const PoWAlgorithm_1 = __importDefault(require("../strategy/algorithms/PoWAlgorithm"));
var ConsensusAlogrithm;
(function (ConsensusAlogrithm) {
    ConsensusAlogrithm[ConsensusAlogrithm["POW"] = 0] = "POW";
    ConsensusAlogrithm[ConsensusAlogrithm["POA"] = 1] = "POA";
})(ConsensusAlogrithm = exports.ConsensusAlogrithm || (exports.ConsensusAlogrithm = {}));
class NodeConfig {
    constructor() {
        const CONSENSUS = process.env.CONSENSUS || 'POA';
        if (CONSENSUS === 'POW') {
            this.algorithm = new PoWAlgorithm_1.default();
            this.algortithmInfo = 'Proof of Work';
        }
        else {
            this.algorithm = new PoWAlgorithm_1.default();
            this.algortithmInfo = 'Proof of Authority';
        }
        this.peers = new Array();
    }
    static getInstance() {
        if (!NodeConfig.instance) {
            NodeConfig.instance = new NodeConfig();
        }
        return NodeConfig.instance;
    }
    getConsensusAlgorithmInfo() {
        return this.algortithmInfo;
    }
    setConsensusAlgorithmInfo(consesusInfo) {
        this.algortithmInfo = consesusInfo;
    }
    getConsensusAlgorithm() {
        return this.algorithm;
    }
    setConsensusAlgorithm(algorithm) {
        this.algorithm = algorithm;
    }
    getPeers() {
        return this.peers;
    }
    setPeers(peers) {
        this.peers = peers;
    }
}
exports.default = NodeConfig;
//# sourceMappingURL=NodeConfig.js.map