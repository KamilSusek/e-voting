import Block from "./Block";

class Blockchain {
  chain: Block[];
  constructor() {
    this.chain = [Block.generateGenesisBlock()];
  }

  addNewBlock(data: any) {
    const previousBlock = this.chain[this.chain.length - 1];
    const block = Block.mineBlock(previousBlock, data);

    this.chain.push(block);

    return block;
  }

  isChainIntegral(chain: Block[]) {
    if (chain[0] !== Block.generateGenesisBlock()) return false;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const previousBlock = chain[i - 1];

      if (
        block.previousHash !== previousBlock.hash ||
        block.hash !== Block.calculateBlockHash(block)
      ) {
        return false;
      }
    }

    return true;
  }

  swapChain(newChain: Block[]) {
    if (newChain.length <= this.chain.length) {
      return;
    } else if (!this.isChainIntegral(newChain)) {
      return;
    }

    this.chain = newChain;
  }
}

export default Blockchain;
