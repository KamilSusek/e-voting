class PeersRepository {
  public static instance: PeersRepository
  private peerUrls: string[]

  private constructor () {
    this.peerUrls = new Array<string>()
  }

  public static getInstance (): PeersRepository {
    if (!PeersRepository.instance) {
      PeersRepository.instance = new PeersRepository()
    }

    return PeersRepository.instance
  }

  public getPeers (): string[] {
    return this.peerUrls
  }

  public setPeers (peerUrls: string[]) {
    this.peerUrls = peerUrls
  }

  public deletePeer (url: string) {
    const filter = (peer: string) => {
      if (peer === url) {
        return -1
      }
    }

    this.peerUrls = this.peerUrls.filter(filter)
  }
}

export default PeersRepository
