import WebSocket from "ws";
import Blockchain from "./blockchain/Blockchain";
import BlockchainService from "./BlockchainService";
import MessageActions from "./models/Message";
import Message from "./models/Message";
import BlockchainRepository from "./repository/BlockchainRepository";

class P2PManager {
  private static instance: P2PManager;

  readonly P2P_PORT = process.env.P2P_PORT || 5001;
  readonly peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
  readonly server: WebSocket.Server;

  sockets: WebSocket[];

  private constructor() {
    this.server = new WebSocket.Server({ port: +this.P2P_PORT });
    this.sockets = [];
  }

  public static getInstance(): P2PManager {
    if (!P2PManager.instance) {
      P2PManager.instance = new P2PManager();
    }

    return P2PManager.instance;
  }

  public listen() {
    this.server.on("connection", (socket) => this.connectSocket(socket));
    this.conectToPeers();
    console.log("Listening", this.peers);
  }

  private messageHandler(socket: any) {
    socket.on("message", (message: any) => {
      const msg = JSON.parse(message);
      this.messageActions(msg.message, msg.data);
    });
  }
  private messageActions(message: any, data: any) {
    switch (message) {
      case MessageActions.ADD_BLOCK:
        const repo = BlockchainRepository.getInstance();
        repo.findByName(data.chainName).addNewBlock(data.vote);
        break;
      case MessageActions.SYNC_CHAIN:
        break;
      default:
        break;
    }
  }

  private connectSocket(socket: WebSocket) {
    this.sockets.push(socket);
    console.log("Socket connected.");
    this.messageHandler(socket);
  }

  private conectToPeers() {
    for (const peer of this.peers) {
      const socket = new WebSocket(peer);

      socket.on("open", () => this.connectSocket(socket));
    }
  }

  public synchronizeChain(data: any) {
    const repo = BlockchainRepository.getInstance();
    const chain = repo.findByName(data.data.chainName);

    if (chain) {
      this.sockets.forEach((socket) => {
        this.sendChain(socket, data);
      });
    }
  }

  sendChain(socket: any, data: any) {
    socket.send(JSON.stringify(data));
  }
}

export default P2PManager;
