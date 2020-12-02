import Blockchain from '../Blockchain'
import { SHA256 } from 'crypto-js'

class PoWBlockchain extends Blockchain {
  constructor () {
    super()
  }

  public mine (data: any) {
    const blockchain = this.blockchain.getChain()
    const lastBlock = blockchain[blockchain.length - 1]
    const nonce = this.solveNonce(lastBlock.nonce, lastBlock.prevHash)

    const newBlock = this.createNewBlock(nonce, lastBlock.prevHash, data)
    this.blockchain.addBlock(newBlock)
  }

  public getSyncValue (): number {
    return this.blockchain.getChain().length
  }

  public synchronize (syncValue: number): boolean {
    if (this.blockchain.getChain().length < syncValue) {
      return true
    } else {
      return false
    }
  }

  private solveNonce (lastNonce: number, prevHash: string) {
    let nonce = 0

    while (!this.validateNonce(lastNonce, nonce, prevHash)) {
      nonce++
    }

    return nonce
  }

  private validateNonce (
    lastNonce: number,
    nonce: number,
    prevHash: string
  ): boolean {
    const attempt = `${lastNonce}${nonce}${prevHash}`
    const hash = SHA256(attempt).toString()

    const isValid = hash.startsWith('000')
    return isValid
  }
}

export default PoWBlockchain
