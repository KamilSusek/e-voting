import Block from '../blockchain/Block'

abstract class Blockchain {
  abstract mine (data: any): void
  abstract getScore (): Block[]
  abstract setChain (chain: any): void
}

export default Blockchain
