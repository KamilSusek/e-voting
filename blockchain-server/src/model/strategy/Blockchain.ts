import { SHA256 } from 'crypto-js'
import Block from '../entities/Block'
import ChainRepository from '../repository/ChainRepository'

abstract class Blockchain {
  protected blockchain: ChainRepository

  constructor () {
    this.blockchain = ChainRepository.getInstance()
  }

  abstract mine (data: any): void
  abstract getSyncValue (): number
  abstract synchronize (syncValue: number): boolean

  public createNewBlock (nonce: number, prevHash: string, data: any): Block {
    const blockchain = this.blockchain.getChain()
    const chainLength = blockchain.length
    const date = Date.now().toString()

    const block = new Block(chainLength, date, nonce, prevHash, data)

    return block
  }

  public setChain (chain: Block[]) {
    this.blockchain.setChain(chain)
  }

  public getScore (): Block[] {
    return this.blockchain.getChain()
  }

  private getHash (block: Block): string {
    const inputWord = block.toString()
    const hash = SHA256(inputWord).toString()
    return hash
  }
}

export default Blockchain
