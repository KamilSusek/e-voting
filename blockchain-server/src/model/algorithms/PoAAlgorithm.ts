import { SHA256 } from 'crypto-js'
import Block from '../blockchain/Block'
import Chain from '../Chain'
import Blockchain from './Blockchain'

class PoAAlgorithm extends Blockchain {
  private chain: Chain
  private authorityFactor: number
  constructor () {
    super()
    this.chain = Chain.getInstance()
    this.authorityFactor = 100
  }

  public mine (data: any) {
    const blockchain = this.chain.getChain()
    const lastBlock = blockchain[blockchain.length - 1]
    const newBlock = this.createNewBlock(0, lastBlock.getPrevHash(), data)
    this.chain.addBlock(newBlock)
    this.authorityFactor++
  }

  public getScore (): Block[] {
    return this.chain.getChain()
  }

  public setChain (chain: Block[]) {
    this.chain.setChain(chain)
  }

  public createNewBlock (nonce: number, prevHash: string, data: any): Block {
    const blockchain = this.chain.getChain()

    const block = new Block(
      blockchain.length,
      '2020-01-02',
      nonce,
      this.getHash(blockchain[blockchain.length - 1]),
      data
    )

    return block
  }

  private getHash (block: Block): string {
    return SHA256(block.toString()).toString()
  }
}

export default PoAAlgorithm
