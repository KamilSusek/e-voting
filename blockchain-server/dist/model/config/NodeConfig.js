"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsensusAlogrithm = void 0;
var ConsensusAlogrithm;
(function (ConsensusAlogrithm) {
    ConsensusAlogrithm[ConsensusAlogrithm["POW"] = 0] = "POW";
    ConsensusAlogrithm[ConsensusAlogrithm["POA"] = 1] = "POA";
})(ConsensusAlogrithm = exports.ConsensusAlogrithm || (exports.ConsensusAlogrithm = {}));
class NodeConfig {
    constructor() {
        this.peers = new Array();
    }
    static getInstance() {
        if (!NodeConfig.instance) {
            NodeConfig.instance = new NodeConfig();
        }
        return NodeConfig.instance;
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