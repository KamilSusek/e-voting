import PeersRepository from '../repository/PeersRepository'

class PeersService {
  private peersRepo: PeersRepository

  constructor () {
    this.peersRepo = PeersRepository.getInstance()
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

export default PeersService
