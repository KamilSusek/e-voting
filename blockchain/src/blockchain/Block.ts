import { SHA256 } from "crypto-js";

class Block {
  data: any;
  hash: any;
  previousHash: any;
  timestamp: any;
  constructor(timestamp: any, previousHash: any, hash: any, data: any) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
  }

  static generateGenesisBlock(): Block {
    return new this("none", "none", "none", "none");
  }

  static hashBlock(timestamp: any, previousHash: any, data: any): string {
    return SHA256(`${timestamp}${previousHash}${data}`).toString();
  }

  static mineBlock(prevoiusBlock: any, data: any): Block {
    const timestamp = Date.now();
    let hash;
    const prevoiusHash = prevoiusBlock.hash;
    hash = Block.hashBlock(timestamp, prevoiusHash, data);

    return new this(timestamp, prevoiusHash, hash, data);
  }

  static calculateBlockHash(block: any): string {
    const { timestamp, previousHash, data } = block;

    return Block.hashBlock(timestamp, previousHash, data);
  }
}

export default Block;
