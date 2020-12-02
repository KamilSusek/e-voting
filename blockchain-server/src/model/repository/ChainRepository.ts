import Block from '../entities/Block'

class ChainRepository {
  public static instance: ChainRepository
  private chain: Block[]

  private constructor () {
    this.chain = new Array<Block>()
    this.createGenesisBlock()
  }

  public static getInstance (): ChainRepository {
    if (!ChainRepository.instance) {
      ChainRepository.instance = new ChainRepository()
    }

    return ChainRepository.instance
  }

  public getChain (): Block[] {
    return this.chain
  }

  public setChain (chain: Block[]) {
    this.chain = chain
  }

  public addBlock (block: Block) {
    this.chain.push(block)
  }

  private createGenesisBlock () {
    const block = new Block(this.chain.length, '0', 0, '0', 'genesis')

    this.chain.push(block)
  }
}

export default ChainRepository
