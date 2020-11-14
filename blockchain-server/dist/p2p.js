"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
class P2PServer {
    constructor(blockchainService) {
        this.blockchainService = blockchainService;
        this.sockets = [];
    }
    listen() {
        const server = new ws_1.default.Server({ port: +P2P_PORT });
        server.on("connection", (socket) => this.connectSocket(socket));
        console.log(peers);
        this.connectToPeers();
    }
    connectSocket(socket) {
        this.sockets.push(socket);
        console.log("Socket connected!");
        this.messageHandler(socket);
        this.sendChain(socket);
    }
    connectToPeers() {
        peers.forEach((peer) => {
            const socket = new ws_1.default(peer);
            socket.on("open", () => this.connectSocket(socket));
        });
    }
    messageHandler(socket) {
        socket.on("message", (message) => {
            const data = JSON.parse(message.toString());
            if (data.message && data.message === "ADD_BLOCK") {
                console.log("Message", data);
            }
            else {
                console.log("data", data);
            }
            this.synchronizeChain();
        });
    }
    sendChain(socket) {
        // socket.send(JSON.stringify(this.blockchain.chain));
    }
    sendBlock(socket, blockData) {
        socket.send(JSON.stringify(blockData));
    }
    synchronizeChain() {
        this.sockets.forEach((socket) => {
            this.sendChain(socket);
        });
    }
    distributeBlock(blockData) {
        this.sockets.forEach((socket) => {
            this.sendBlock(socket, blockData);
        });
    }
}
exports.default = P2PServer;
//# sourceMappingURL=p2p.js.map