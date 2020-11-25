"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPeer = exports.getPeers = exports.ping = void 0;
const BlockchainFacade_1 = __importDefault(require("../facade/BlockchainFacade"));
const blockchain = new BlockchainFacade_1.default();
function ping(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send('ok');
    });
}
exports.ping = ping;
function getPeers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const peers = blockchain.getAllPeers();
        res.send(peers);
    });
}
exports.getPeers = getPeers;
function registerPeer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { url } = req.body;
        blockchain.addNewPeer(url);
        res.send();
    });
}
exports.registerPeer = registerPeer;
//# sourceMappingURL=PeersController.js.map