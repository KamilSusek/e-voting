import WebSocket from "ws";
import Blockchain from "./blockchain/Blockchain";

const P2P_PORT = process.env.P2P_PORT || 5001;

const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

class P2PServer {
  sockets: any[];
  blockchain: Blockchain;
  constructor(blockchain: Blockchain) {
    this.blockchain = blockchain;
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
      console.log("data", data);
      this.blockchain.swapChain(data);
    });
  }

  sendChain(socket: any) {
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  synchronizeChain() {
    this.sockets.forEach((socket) => {
      this.sendChain(socket);
    });
  }
}

export default P2PServer;
