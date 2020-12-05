import NodeConfig from '../config/NodeConfig'
import Blockchain from '../strategy/Blockchain'

class ScoreService {
  private blockchain: Blockchain

  constructor () {
    this.blockchain = NodeConfig.getInstance().getConsensusAlgorithm()
  }

  public getScore (): any[] {
    const chain = this.blockchain.getScore()
    const resultsArray = new Array()

    for (const block of chain) {
      const data = block.data
      resultsArray.push(data)
    }

    return resultsArray
  }

  public calculateResuts (): string[] {
    const chain = this.blockchain.getScore()
    const results = new Array<string>()
    for (const item of chain) {
      const block = item.data
      results.push(block)
    }

    return results
  }
}

export default ScoreService
