"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PeersRepository_1 = __importDefault(require("../model/repository/PeersRepository"));
const peers_1 = require("../middleware/peers");
const HTTP_PORT = process.env.HTTP_PORT || 3001;
const peers = express_1.default.Router();
const peerRepo = PeersRepository_1.default.getInstance();
// if (HTTP_PORT === 3001) {
//   const p = peerRepo.getPeers()
//   p.push('http://localhost:3002')
//   p.push('http://localhost:3003')
//   peerRepo.setPeers(p)
// }
// if (HTTP_PORT === '3002') {
//   const p = peerRepo.getPeers()
//   p.push('http://localhost:3001')
//   p.push('http://localhost:3003')
//   peerRepo.setPeers(p)
// }
// if (HTTP_PORT === '3003') {
//   const p = peerRepo.getPeers()
//   p.push('http://localhost:3001')
//   p.push('http://localhost:3002')
//   peerRepo.setPeers(p)
// }
peers.get('/ping', peers_1.ping);
peers.get('/peers', peers_1.getPeers);
peers.post('/register', peers_1.registerPeer);
exports.default = peers;
//# sourceMappingURL=peers.js.map