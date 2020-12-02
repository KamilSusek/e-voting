export enum ConsensusAlogrithm {
  POW,
  POA
}

class NodeConfig {
  private static instance: NodeConfig
  private algorithm: ConsensusAlogrithm
  private peers: string[]

  private constructor () {
    this.peers = new Array<string>()
  }

  public static getInstance (): NodeConfig {
    if (!NodeConfig.instance) {
      NodeConfig.instance = new NodeConfig()
    }
    return NodeConfig.instance
  }

  public getConsensusAlgorithm (): ConsensusAlogrithm {
    return this.algorithm
  }

  public setConsensusAlgorithm (algorithm: ConsensusAlogrithm) {
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
