import PeersRepo from '../model/Peers'
import Blockchain from '../model/algorithms/Blockchain'
import PoWAlgorithm from '../model/algorithms/PoWAlgorithm'
import axios from 'axios'
import PoAAlgorithm from '../model/algorithms/PoAAlgorithm'

class BlockchainFacade {
  private blockchain: Blockchain
  private peersRepo: PeersRepo

  constructor () {
    this.blockchain = new PoAAlgorithm()
    this.peersRepo = PeersRepo.getInstance()
  }

  public synchronizeOnInit () {
    const peers = this.peersRepo.getPeers()

    for (const peer of peers) {
      axios.post(peer + '/synchronize').catch(err => {
        console.log('')
      })
    }
  }

  public getScore (): any[] {
    const chain = this.blockchain.getScore()
    const resultsArray = new Array()
    for (const block of chain) {
      const data = block.getData()
      resultsArray.push(data)
    }

    return resultsArray
  }

  public distributeVote (vote: any) {
    const peers = this.peersRepo.getPeers()

    for (const peer of peers) {
      axios.post(peer + '/mine', vote).catch(err => {
        console.log('')
      })
    }
  }

  public mine (candidateName: string) {
    this.blockchain.mine(candidateName)
  }

  public synchronizeNode (chain: any[]) {
    if (chain.length > this.blockchain.getScore().length) {
      this.blockchain.setChain(chain)
    }
  }

  public synchronizeChain () {
    const peers = this.peersRepo.getPeers()

    for (const peer of peers) {
      axios
        .post(peer + '/node/synchronize', {
          chain: this.blockchain.getScore()
        })
        .catch(err => {
          console.log('')
        })
    }
  }

  public calculateResuts (): string[] {
    const chain = this.blockchain.getScore()
    const results = new Array<string>()
    for (const item of chain) {
      const block = item.getData()
      results.push(block)
    }

    return results
  }

  public getAllPeers () {
    return this.peersRepo.getPeers()
  }

  public addNewPeer (peer: string) {
    const peers = this.peersRepo.getPeers()
    peers.push(peer)
    this.peersRepo.setPeers(peers)
  }

  public deletePeer (peerUrl: string) {
    const peers = this.peersRepo.getPeers()
    const resultsArray = peers.filter(peer => {
      if (peer !== peerUrl) {
        return -1
      }
    })

    this.peersRepo.setPeers(resultsArray)
  }
}

export default BlockchainFacade
