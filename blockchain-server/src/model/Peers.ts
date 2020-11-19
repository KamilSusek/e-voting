class PeersRepo {
  public static instance: PeersRepo
  private peerUrls: string[]

  private constructor () {
    this.peerUrls = new Array<string>()
  }

  public static getInstance (): PeersRepo {
    if (!PeersRepo.instance) {
      PeersRepo.instance = new PeersRepo()
    }

    return PeersRepo.instance
  }

  public getPeers (): string[] {
    return this.peerUrls
  }

  public setPeers (peerUrls: string[]) {
    this.peerUrls = peerUrls
  }
}

export default PeersRepo
