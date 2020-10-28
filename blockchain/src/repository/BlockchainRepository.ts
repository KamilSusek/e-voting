import Blockchain from "../blockchain/Blockchain";

/**
 * Singleton Repository class.
 */
class BlockchainRepository {
  private static instance: BlockchainRepository;

  private chains: Blockchain[];

  private constructor() {
    this.chains = new Array();
  }

  public static getInstance(): BlockchainRepository {
    if (!BlockchainRepository.instance) {
      BlockchainRepository.instance = new BlockchainRepository();
    }

    return BlockchainRepository.instance;
  }

  public saveChain(blockchain: Blockchain) {
    this.chains.push(blockchain);
  }

  public saveBlock(data: any, chainName: string): boolean {
    for (let i = 0; i < this.chains.length; i++) {
      if (this.chains[i].chainName === chainName) {
        this.chains[i].addNewBlock(data);
        return true;
      }
    }

    return false;
  }

  public findAll(): Blockchain[] {
    return this.chains;
  }

  public findByName(name: string): Blockchain {
    for (const it of this.chains) {
      if (it.chainName === name) {
        return it;
      }
    }

    return null;
  }
}

export default BlockchainRepository;
