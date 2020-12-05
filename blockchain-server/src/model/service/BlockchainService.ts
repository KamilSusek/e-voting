import PeersRepository from '../repository/PeersRepository'
import Blockchain from '../strategy/Blockchain'
import axios from 'axios'
import Block from '../entities/Block'
import NodeConfig from '../config/NodeConfig'

class BlockchainService {
  private blockchain: Blockchain
  private peersRepo: PeersRepository

  constructor () {
    this.blockchain = NodeConfig.getInstance().getConsensusAlgorithm()
    this.peersRepo = PeersRepository.getInstance()
  }

  public synchronizeOnInit () {
    const peers = this.peersRepo.getPeers()

    for (const peer of peers) {
      axios.post(peer + '/synchronize').catch(err => {
        console.log(`Peer: ${peer} is not working.`)
      })
    }
  }

  public distributeVote (vote: any) {
    const peers = this.peersRepo.getPeers()

    for (const peer of peers) {
      axios.post(peer + '/mine', vote).catch(err => {
        console.log(`Peer:${peer} is not working.`)
      })
    }
  }

  public mine (candidateName: string) {
    this.blockchain.mine(candidateName)
  }

  public synchronizeNode (syncValue: number, chain: Block[]) {
    if (this.blockchain.synchronize(syncValue)) {
      this.blockchain.setChain(chain)
    }
  }

  public synchronizeChain () {
    const peers = this.peersRepo.getPeers()

    for (const peer of peers) {
      axios
        .post(peer + '/node/synchronize', {
          chain: this.blockchain.getScore(),
          syncValue: this.blockchain.getSyncValue()
        })
        .catch(err => {
          console.log(`Peer: ${peer} is not working.`)
        })
    }
  }
}

export default BlockchainService
