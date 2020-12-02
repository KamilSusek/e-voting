import PeersRepository from '../repository/PeersRepository'
import Blockchain from '../strategy/Blockchain'
import PoWAlgorithm from '../strategy/algorithms/PoWAlgorithm'
import axios from 'axios'
import PoAAlgorithm from '../strategy/algorithms/PoAAlgorithm'
import Block from '../entities/Block'

class BlockchainService {
  private blockchain: Blockchain
  private peersRepo: PeersRepository

  constructor () {
    this.blockchain = new PoWAlgorithm()
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
