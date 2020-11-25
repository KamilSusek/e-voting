"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PeersRepo {
    constructor() {
        this.peerUrls = new Array();
    }
    static getInstance() {
        if (!PeersRepo.instance) {
            PeersRepo.instance = new PeersRepo();
        }
        return PeersRepo.instance;
    }
    getPeers() {
        return this.peerUrls;
    }
    setPeers(peerUrls) {
        this.peerUrls = peerUrls;
    }
}
exports.default = PeersRepo;
//# sourceMappingURL=Peers.js.map