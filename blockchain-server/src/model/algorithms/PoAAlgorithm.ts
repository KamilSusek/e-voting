import { SHA256 } from 'crypto-js'
import Block from '../Block'
import Chain from '../Chain'
import Blockchain from './Blockchain'

class PoAAlgorithm extends Blockchain {
  private authorityFactor: number

  constructor () {
    super()
    this.authorityFactor = 100
  }

  public mine (data: any) {
    const blockchain = this.chain.getChain()
    const lastBlock = blockchain[blockchain.length - 1]
    const newBlock = this.createNewBlock(0, lastBlock.getPrevHash(), data)
    this.chain.addBlock(newBlock)
    this.authorityFactor++
  }

  public getSyncValue (): number {
    return this.authorityFactor
  }

  public synchronize (auth: number) {
    if (this.authorityFactor < auth) {
      return false
    } else {
      return true
    }
  }
}

export default PoAAlgorithm
