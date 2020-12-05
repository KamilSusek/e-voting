import PoWBlockchain from '../strategy/algorithms/PoWAlgorithm'
import Blockchain from '../strategy/Blockchain'

export enum ConsensusAlogrithm {
  POW,
  POA
}

class NodeConfig {
  private static instance: NodeConfig
  private algorithm: Blockchain
  private algortithmInfo: string
  private peers: string[]

  private constructor () {
    const CONSENSUS = process.env.CONSENSUS || 'POA'
    if (CONSENSUS === 'POW') {
      this.algorithm = new PoWBlockchain()
      this.algortithmInfo = 'Proof of Work'
    } else {
      this.algorithm = new PoWBlockchain()
      this.algortithmInfo = 'Proof of Authority'
    }
    this.peers = new Array<string>()
  }

  public static getInstance (): NodeConfig {
    if (!NodeConfig.instance) {
      NodeConfig.instance = new NodeConfig()
    }
    return NodeConfig.instance
  }

  public getConsensusAlgorithmInfo () {
    return this.algortithmInfo
  }

  public setConsensusAlgorithmInfo (consesusInfo: string) {
    this.algortithmInfo = consesusInfo
  }

  public getConsensusAlgorithm (): Blockchain {
    return this.algorithm
  }

  public setConsensusAlgorithm (algorithm: Blockchain) {
    this.algorithm = algorithm
  }

  public getPeers (): string[] {
    return this.peers
  }

  public setPeers (peers: string[]) {
    this.peers = peers
  }
}

export default NodeConfig
