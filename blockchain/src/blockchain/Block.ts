import { SHA256 } from "crypto-js";

const DIFFICULTY = 3;

class Block {
  data: any;
  hash: any;
  previousHash: any;
  timestamp: any;
  nonce: number;
  difficulty: number;
  constructor(
    timestamp: any,
    previousHash: any,
    hash: any,
    data: any,
    nonce: number,
    difficulty?: number
  ) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static generateGenesisBlock(): Block {
    return new this("none", "none", "none", "none", 2, DIFFICULTY);
  }

  static hashBlock(
    timestamp: any,
    previousHash: any,
    data: any,
    nonce: number,
    difficulty: number
  ): string {
    return SHA256(
      `${timestamp}${previousHash}${data}${nonce}${difficulty}`
    ).toString();
  }

  static mineBlock(prevoiusBlock: any, data: any): Block {
    const timestamp = Date.now();
    let hash;
    const prevoiusHash = prevoiusBlock.hash;
    let nonce = 0;
    hash = Block.hashBlock(timestamp, prevoiusHash, data, nonce, DIFFICULTY);

    while (hash.substring(0, DIFFICULTY) !== Array(DIFFICULTY + 1).join("0")) {
      nonce++;
      hash = Block.hashBlock(timestamp, prevoiusHash, data, nonce, DIFFICULTY);
    }

    return new this(timestamp, prevoiusHash, hash, data, 2, DIFFICULTY);
  }

  static calculateBlockHash(block: any): string {
    const { timestamp, previousHash, data, nonce, difficulty } = block;

    return Block.hashBlock(timestamp, previousHash, data, nonce, difficulty);
  }
}

export default Block;
