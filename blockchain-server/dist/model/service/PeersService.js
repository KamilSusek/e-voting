"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PeersRepository_1 = __importDefault(require("../repository/PeersRepository"));
class PeersService {
    constructor() {
        this.peersRepo = PeersRepository_1.default.getInstance();
    }
    getAllPeers() {
        return this.peersRepo.getPeers();
    }
    addNewPeer(peer) {
        const peers = this.peersRepo.getPeers();
        peers.push(peer);
        this.peersRepo.setPeers(peers);
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
exports.default = PeersService;
//# sourceMappingURL=PeersService.js.map