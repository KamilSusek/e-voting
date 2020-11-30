"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Peers_1 = __importDefault(require("../model/Peers"));
const PoWAlgorithm_1 = __importDefault(require("../model/algorithms/PoWAlgorithm"));
const axios_1 = __importDefault(require("axios"));
class BlockchainFacade {
    constructor() {
        this.blockchain = new PoWAlgorithm_1.default();
        this.peersRepo = Peers_1.default.getInstance();
    }
    synchronizeOnInit() {
        const peers = this.peersRepo.getPeers();
        for (const peer of peers) {
            axios_1.default.post(peer + '/synchronize').catch(err => {
                console.log(`Peer: ${peer} is not working.`);
            });
        }
    }
    getScore() {
        console.log(this.blockchain);
        const chain = this.blockchain.getScore();
        const resultsArray = new Array();
        for (const block of chain) {
            const data = block.getData();
            resultsArray.push(data);
        }
        return resultsArray;
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
    calculateResuts() {
        const chain = this.blockchain.getScore();
        const results = new Array();
        for (const item of chain) {
            const block = item.getData();
            results.push(block);
        }
        return results;
    }
    getAllPeers() {
        return this.peersRepo.getPeers();
    }
    addNewPeer(peer) {
        const peers = this.peersRepo.getPeers();
        peers.push(peer);
        this.peersRepo.setPeers(peers);
        this.synchronizeOnInit();
    }
    deletePeer(peerUrl) {
        const peers = this.peersRepo.getPeers();
        const resultsArray = peers.filter(peer => {
            if (peer !== peerUrl) {
                return -1;
            }
        });
        this.peersRepo.setPeers(resultsArray);
    }
}
exports.default = BlockchainFacade;
//# sourceMappingURL=BlockchainFacade.js.map