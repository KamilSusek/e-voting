import express from "express";
import bodyParser from "body-parser";
import Blockchain from "./blockchain/Blockchain";
import P2PServer from "./p2p";

const app = express();
const blockchain = new Blockchain();
const p2p = new P2PServer(blockchain);

app.use(bodyParser.json());

app.get("/chain", (req: any, res: any) => {
  res.json(blockchain.chain);
});

app.post("/block", (req: any, res: any) => {
  const option = req.body;
  if (option) {
    blockchain.addNewBlock(option);
    res.status(200).send();
  } else {
    res.status(402).send();
  }
});

console.log("Run");

p2p.listen();

/*app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}.`);
});*/

/**
 * $env:HTTP_PORT = 3003; $env:P2P_PORT = 5003; $env:PEERS = 'ws://localhost:5002,ws://localhost:5001'; npm run dev
 */
