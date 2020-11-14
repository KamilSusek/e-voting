"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const Message_1 = __importDefault(require("./models/Message"));
const BlockchainRepository_1 = __importDefault(require("./repository/BlockchainRepository"));
class P2PManager {
    constructor() {
        this.P2P_PORT = process.env.P2P_PORT || 5001;
        this.peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
        this.server = new ws_1.default.Server({ port: +this.P2P_PORT });
        this.sockets = [];
    }
    static getInstance() {
        if (!P2PManager.instance) {
            P2PManager.instance = new P2PManager();
        }
        return P2PManager.instance;
    }
    listen() {
        this.server.on("connection", (socket) => this.connectSocket(socket));
        this.conectToPeers();
        console.log("Listening", this.peers);
    }
    messageHandler(socket) {
        socket.on("message", (message) => {
            const msg = JSON.parse(message);
            this.messageActions(msg.message, msg.data);
        });
    }
    messageActions(message, data) {
        switch (message) {
            case Message_1.default.ADD_BLOCK:
                const repo = BlockchainRepository_1.default.getInstance();
                repo.findByName(data.chainName).addNewBlock(data.vote);
                break;
            case Message_1.default.SYNC_CHAIN:
                break;
            default:
                break;
        }
    }
    connectSocket(socket) {
        this.sockets.push(socket);
        console.log("Socket connected.");
        this.messageHandler(socket);
    }
    conectToPeers() {
        for (const peer of this.peers) {
            const socket = new ws_1.default(peer);
            socket.on("open", () => this.connectSocket(socket));
        }
    }
    synchronizeChain(data) {
        const repo = BlockchainRepository_1.default.getInstance();
        const chain = repo.findByName(data.data.chainName);
        if (chain) {
            this.sockets.forEach((socket) => {
                this.sendChain(socket, data);
            });
        }
    }
    sendChain(socket, data) {
        socket.send(JSON.stringify(data));
    }
}
exports.default = P2PManager;
//# sourceMappingURL=P2PManager.js.map