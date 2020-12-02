"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PeersRepository_1 = __importDefault(require("../repository/PeersRepository"));
const PoWAlgorithm_1 = __importDefault(require("../strategy/algorithms/PoWAlgorithm"));
const axios_1 = __importDefault(require("axios"));
class BlockchainService {
    constructor() {
        this.blockchain = new PoWAlgorithm_1.default();
        this.peersRepo = PeersRepository_1.default.getInstance();
    }
    synchronizeOnInit() {
        const peers = this.peersRepo.getPeers();
        for (const peer of peers) {
            axios_1.default.post(peer + '/synchronize').catch(err => {
                console.log(`Peer: ${peer} is not working.`);
            });
        }
    }
    distributeVote(vote) {
        const peers = this.peersRepo.getPeers();
        for (const peer of peers) {
            axios_1.default.post(peer + '/mine', vote).catch(err => {
                console.log(`Peer:${peer} is not working.`);
            });
        }
    }
    mine(candidateName) {
        this.blockchain.mine(candidateName);
    }
    synchronizeNode(syncValue, chain) {
        if (this.blockchain.synchronize(syncValue)) {
            this.blockchain.setChain(chain);
        }
    }
    synchronizeChain() {
        const peers = this.peersRepo.getPeers();
        for (const peer of peers) {
            axios_1.default
                .post(peer + '/node/synchronize', {
                chain: this.blockchain.getScore(),
                syncValue: this.blockchain.getSyncValue()
            })
                .catch(err => {
                console.log(`Peer: ${peer} is not working.`);
            });
        }
    }
}
exports.default = BlockchainService;
//# sourceMappingURL=BlockchainService.js.map