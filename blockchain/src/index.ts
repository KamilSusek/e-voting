import express from "express";
import bodyParser from "body-parser";
import Blockchain from "./blockchain/Blockchain";
import P2PServer from "./p2p";
import BlockchainService from "./BlockchainService";
import BlockchainRepository from "./repository/BlockchainRepository";
import P2PManager from "./P2PManager";
import MessageActions from "./models/Message";

const app = express();

const p2p = P2PManager.getInstance();
const blockchains = BlockchainRepository.getInstance();

blockchains.saveChain(new Blockchain("wybory1"));
blockchains.saveChain(new Blockchain("wybory2"));

const blockchainService = new BlockchainService();
// const p2p = new P2PServer(blockchainService);

const HTTP_PORT = process.env.HTTP_PORT || 3001;

app.use(bodyParser.json());

/**
 * Get all elections.
 */
app.get("/elections", (req: any, res: any) => {
  res.json(blockchainService.getAllChains());
});

/**
 * Get specified election.
 */
app.get("/election/:election_name", (req, res) => {
  res.send(200);
});

/**
 * Initialize new election chain.
 */
app.post("/election", (req, res) => {
  res.send(200);
});

/**
 * Send vote.
 */
app.post("/vote/:election_name", async (req: any, res: any) => {
  try {
    const option = req.body;
    const { election_name } = req.params;
    if (option) {
      const data = {
        message: MessageActions.ADD_BLOCK,
        data: { vote: option, chainName: election_name },
      };

      await blockchainService.pushNewBlock(option, election_name);

      p2p.synchronizeChain(data);

      res.status(200).send();
    } else {
      res.status(402).send();
    }
  } catch (err) {
    res.status(402).send();
  }
});

p2p.listen();

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}.`);
});

/**
 * npm run start
 * $env:HTTP_PORT = 3002; $env:P2P_PORT = 5002; $env:PEERS = 'ws://localhost:5001'; npm run start
 * $env:HTTP_PORT = 3003; $env:P2P_PORT = 5003; $env:PEERS = 'ws://localhost:5002,ws://localhost:5001'; npm run start
 */
