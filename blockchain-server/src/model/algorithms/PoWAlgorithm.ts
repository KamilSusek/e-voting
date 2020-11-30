import Block from '../Block'
import Chain from '../Chain'
import Blockchain from './Blockchain'
import { SHA256 } from 'crypto-js'

class PoWBlockchain extends Blockchain {
  constructor () {
    super()
  }

  public mine (data: any) {
    const blockchain = this.chain.getChain()
    const lastBlock = blockchain[blockchain.length - 1]
    const nonce = this.solveNonce(lastBlock.getNonce(), lastBlock.getPrevHash())

    const newBlock = this.createNewBlock(nonce, lastBlock.getPrevHash(), data)
    this.chain.addBlock(newBlock)
  }

  getSyncValue (): number {
    return this.chain.getChainLength()
  }

  public synchronize (syncValue: number): boolean {
    if (this.chain.getChain().length < syncValue) {
      return true
    } else {
      return false
    }
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
      .startsWith('000')
  }
}

export default PoWBlockchain
