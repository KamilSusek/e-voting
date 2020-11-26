import { SHA256 } from 'crypto-js'
import Block from './blockchain/Block'

class Chain {
  private chain: Block[]
  public static instance: Chain

  private constructor () {
    this.chain = new Array()
    this.createGenesisBlock()
  }

  public static getInstance (): Chain {
    if (!Chain.instance) {
      Chain.instance = new Chain()
    }

    return Chain.instance
  }

  public setChain (chain: any) {
    this.chain = chain
  }

  public getChain (): Block[] {
    return this.chain
  }

  public getChainLength (): number {
    return this.chain.length
  }

  public addBlock (block: Block) {
    this.chain.push(block)
  }

  private createGenesisBlock () {
    const block = new Block(this.chain.length, '0', 4, '0', 'empty')

    this.chain.push(block)
  }
}

export default Chain
