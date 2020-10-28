import Blockchain from "./blockchain/Blockchain";
import BlockchainRepository from "./repository/BlockchainRepository";

class BlockchainService {
  repo: BlockchainRepository;

  constructor() {
    this.repo = BlockchainRepository.getInstance();
  }

  createNewChain(chainName: string): Promise<string> {
    if (chainName) {
      const chains = this.repo.findAll();
      chains.forEach((chain, index) => {
        if (chain.chainName === chainName) {
          return new Promise((resolve, reject) => {
            const message = "Chain already exists.";
            reject(message);
          });
        }
      });

      return new Promise((resolve, reject) => {
        const message = "Success";
        this.repo.saveChain(new Blockchain(chainName));
        resolve(message);
      });
    } else {
      return new Promise((resolve, reject) => {
        const message = "Chain already exists.";
        reject(message);
      });
    }
  }

  pushNewBlock(data: any, chainName: string): Promise<string> {
    if (chainName) {
      if (this.repo.saveBlock(data, chainName)) {
        return new Promise((resolve, reject) => {
          resolve("ok");
        });
      } else {
        return new Promise((resolve, reject) => {
          const errorMessage = "Invalid chain name.";
          reject(errorMessage);
        });
      }
    } else {
      return new Promise((resolve, reject) => {
        const errorMessage = "Invalid chain name.";
        reject(errorMessage);
      });
    }
  }

  // removeChain(chainName: string) {}

  getAllChains(): Blockchain[] {
    const chains = this.repo.findAll();
    return chains;
  }
}

export default BlockchainService;
