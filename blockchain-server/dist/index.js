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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Blockchain_1 = __importDefault(require("./model/blockchain/Blockchain"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
const HTTP_PORT = process.env.HTTP_PORT || 3001;
const peers = new Array();
if (HTTP_PORT === 3001) {
    peers.push('http://localhost:3002');
    peers.push('http://localhost:3003');
}
if (HTTP_PORT === '3002') {
    peers.push('http://localhost:3001');
    peers.push('http://localhost:3003');
}
if (HTTP_PORT === '3003') {
    peers.push('http://localhost:3001');
    peers.push('http://localhost:3002');
}
let blockchain = new Blockchain_1.default('1');
const transactionPool = new Array();
app.use(body_parser_1.default.json());
app.post('/register', (req, res) => {
    const { url } = req.body;
    peers.push(url);
    res.send('ok');
});
app.get('/votes', (req, res) => {
    res.send(blockchain);
});
app.post('/distribute', (req, res) => {
    const { candidate_name } = req.body;
    const vote = { candidate_name };
    console.log(vote);
    peers.forEach(peer => {
        axios_1.default.post(peer + `/mine`, vote).catch(err => {
            console.log(err);
        });
    });
    blockchain.mine(candidate_name);
    res.status(200).send();
});
app.post('/node/synchronize', (req, res) => {
    const { chain } = req.body;
    if (chain.length > blockchain.getChainLength()) {
        blockchain = chain;
    }
    res.send();
});
app.post('/synchronize', (req, res) => {
    peers.forEach(peer => {
        axios_1.default.post(peer + '/node/synchronize', { chain: blockchain }).catch(err => {
            console.log(err);
        });
    });
    res.status(200).send();
});
app.post('/mine', (req, res) => {
    const { candidate_name } = req.body;
    console.log(candidate_name);
    blockchain.mine(candidate_name);
    res.status(200).send();
});
app.get('/score', (req, res) => {
    const array = new Array();
    blockchain.getChain().forEach(item => {
        const block = item.getData();
        array.push(block);
    });
    res.status(200).send(array);
});
const synchronize = () => {
    peers.forEach((peer) => __awaiter(void 0, void 0, void 0, function* () {
        yield axios_1.default.post(peer + '/synchronize');
    }));
};
app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}.`);
    console.log(peers);
    synchronize();
});
/**
 * npm run start
 * $env:HTTP_PORT = 3002; $env:P2P_PORT = 5002; $env:PEERS = 'ws://localhost:5001'; npm run start
 * $env:HTTP_PORT = 3003; $env:P2P_PORT = 5003; $env:PEERS = 'ws://localhost:5002,ws://localhost:5001'; npm run start
 */
//# sourceMappingURL=index.js.map