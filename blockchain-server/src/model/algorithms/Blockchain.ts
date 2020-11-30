import { SHA256 } from 'crypto-js'
import Block from '../Block'
import Chain from '../Chain'

abstract class Blockchain {
  protected chain: Chain

  constructor () {
    this.chain = Chain.getInstance()
  }

  abstract mine (data: any): void
  abstract getSyncValue (): number
  abstract synchronize (syncValue: number): boolean

  public setChain (chain: Block[]) {
    this.chain.setChain(chain)
  }

  public createNewBlock (nonce: number, prevHash: string, data: any): Block {
    const blockchain = this.chain.getChain()

    const block = new Block(
      blockchain.length,
      Date.now().toString(),
      nonce,
      this.getHash(blockchain[blockchain.length - 1]),
      data
    )

    return block
  }

  public getScore (): Block[] {
    return this.chain.getChain()
  }

  private getHash (block: Block): string {
    return SHA256(block.toString()).toString()
  }
}

export default Blockchain
