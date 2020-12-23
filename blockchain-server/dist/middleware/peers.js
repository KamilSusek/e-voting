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
const PeersService_1 = __importDefault(require("../model/service/PeersService"));
const RequiredBodyNotFoundError_1 = __importDefault(require("../model/errors/product/RequiredBodyNotFoundError"));
const peersService = new PeersService_1.default();
function ping(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send('ok');
    });
}
exports.ping = ping;
function getPeers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const peers = peersService.getAllPeers();
        res.send(peers);
    });
}
exports.getPeers = getPeers;
function registerPeer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { url } = req.body;
        if (url) {
            peersService.addNewPeer(url);
            res.send();
        }
        else {
            const error = new RequiredBodyNotFoundError_1.default();
            const { statusCode, errorMessage } = error.getError();
            res.status(statusCode).send(errorMessage);
        }
    });
}
exports.registerPeer = registerPeer;
//# sourceMappingURL=peers.js.map