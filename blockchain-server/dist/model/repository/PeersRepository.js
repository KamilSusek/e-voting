"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PeersRepository {
    constructor() {
        this.peerUrls = new Array();
    }
    static getInstance() {
        if (!PeersRepository.instance) {
            PeersRepository.instance = new PeersRepository();
        }
        return PeersRepository.instance;
    }
    getPeers() {
        return this.peerUrls;
    }
    setPeers(peerUrls) {
        this.peerUrls = peerUrls;
    }
    deletePeer(url) {
        const filter = (peer) => {
            if (peer === url) {
                return -1;
            }
        };
        this.peerUrls = this.peerUrls.filter(filter);
    }
}
exports.default = PeersRepository;
//# sourceMappingURL=PeersRepository.js.map