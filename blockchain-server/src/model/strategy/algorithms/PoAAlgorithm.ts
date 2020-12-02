import Blockchain from '../Blockchain'

class PoAAlgorithm extends Blockchain {
  private authorityFactor: number

  constructor () {
    super()
    this.authorityFactor = 100
  }

  public mine (data: any) {
    const blockchain = this.blockchain.getChain()
    const lastBlock = blockchain[blockchain.length - 1]
    const newBlock = this.createNewBlock(0, lastBlock.prevHash, data)
    this.blockchain.addBlock(newBlock)
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
