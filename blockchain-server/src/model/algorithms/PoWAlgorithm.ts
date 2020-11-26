import { SHA256 } from 'crypto-js'
import Block from '../blockchain/Block'
import Chain from '../Chain'
import Blockchain from './Blockchain'

class PoWBlockchain extends Blockchain {
  private chain: Chain

  constructor () {
    super()
    this.chain = Chain.getInstance()
  }

  public mine (data: any) {
    const blockchain = this.chain.getChain()
    const lastBlock = blockchain[blockchain.length - 1]
    const nonce = this.solveNonce(lastBlock.getNonce(), lastBlock.getPrevHash())

    const newBlock = this.createNewBlock(nonce, lastBlock.getPrevHash(), data)
    this.chain.addBlock(newBlock)
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

  private solveNonce (lastNonce: number, prevHash: string) {
    let nonce = 0

    while (!this.isNonceValid(lastNonce, nonce, prevHash)) {
      nonce++
    }

    return nonce
  }

  private getHash (block: Block): string {
    return SHA256(block.toString()).toString()
  }

  private isNonceValid (
    lastNonce: number,
    nonce: number,
    prevHash: string
  ): boolean {
    const attempt = `${lastNonce}${nonce}${prevHash}`
    return SHA256(attempt)
      .toString()
      .startsWith('00000')
  }
}

export default PoWBlockchain
