import WebSocket from "ws";
import Block from "./blockchain/Block";
import Blockchain from "./blockchain/Blockchain";
import BlockchainService from "./BlockchainService";

const P2P_PORT = process.env.P2P_PORT || 5001;

const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

class P2PServer {
  sockets: any[];
  blockchainService: BlockchainService;

  constructor(blockchainService: BlockchainService) {
    this.blockchainService = blockchainService;
    this.sockets = [];
  }

  listen() {
    const server = new WebSocket.Server({ port: +P2P_PORT });

    server.on("connection", (socket) => this.connectSocket(socket));
    console.log(peers);
    this.connectToPeers();
  }

  connectSocket(socket: any) {
    this.sockets.push(socket);
    console.log("Socket connected!");
    this.messageHandler(socket);

    this.sendChain(socket);
  }

  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new WebSocket(peer);

      socket.on("open", () => this.connectSocket(socket));
    });
  }

  messageHandler(socket: any) {
    socket.on("message", (message: any) => {
      const data = JSON.parse(message.toString());
      if (data.message && data.message === "ADD_BLOCK") {
        console.log("Message", data);
      } else {
        console.log("data", data);
      }
      this.synchronizeChain();
    });
  }

  sendChain(socket: any) {
    // socket.send(JSON.stringify(this.blockchain.chain));
  }

  sendBlock(socket: any, blockData: any) {
    socket.send(JSON.stringify(blockData));
  }

  synchronizeChain() {
    this.sockets.forEach((socket) => {
      this.sendChain(socket);
    });
  }

  distributeBlock(blockData: any) {
    this.sockets.forEach((socket) => {
      this.sendBlock(socket, blockData);
    });
  }
}

export default P2PServer;
