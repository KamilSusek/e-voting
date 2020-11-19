import { SHA256 } from 'crypto-js'
import Block from './Block'

class Blockchain {
  private static instance: Blockchain
  private blockchain: Block[]

  private constructor () {
    this.blockchain = new Array()
    this.createGenesisBlock()
  }

  public static getInstance (): Blockchain {
    if (!Blockchain.instance) {
      Blockchain.instance = new Blockchain()
    }

    return Blockchain.instance
  }

  private createGenesisBlock () {
    const block = new Block(this.blockchain.length, '0', 4, '0', 'empty')

    this.blockchain.push(block)
  }

  private createNewBlock (nonce: number, prevHash: string, data: any): Block {
    const block = new Block(
      this.blockchain.length,
      '2020-01-02',
      nonce,
      this.getHash(this.blockchain[this.blockchain.length - 1]),
      data
    )

    this.blockchain.push(block)

    return block
  }

  public setChain (chain: any) {
    this.blockchain = chain
  }

  private getHash (block: Block): string {
    return SHA256(block.toString()).toString()
  }

  public getChain (): Block[] {
    return this.blockchain
  }

  public getChainLength (): number {
    return this.blockchain.length
  }

  public mine (data: any) {
    const lastBlock = this.blockchain[this.blockchain.length - 1]
    const nonce = this.solveNonce(lastBlock.getNonce(), lastBlock.getPrevHash())

    this.createNewBlock(nonce, lastBlock.getPrevHash(), data)
  }

  private solveNonce (lastNonce: number, prevHash: string) {
    let nonce = 0

    while (!this.isNonceValid(lastNonce, nonce, prevHash)) {
      nonce++
    }

    return nonce
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

export default Blockchain
