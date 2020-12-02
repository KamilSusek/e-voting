class Block {
  index: number
  timestamp: string
  nonce: number
  prevHash: string
  data: string

  constructor (
    index: number,
    timestamp: string,
    nonce: number,
    prevHash: string,
    data: string
  ) {
    this.index = index
    this.timestamp = timestamp
    this.nonce = nonce
    this.prevHash = prevHash
    this.data = data
  }

  public toString (): string {
    return `${this.index}${this.timestamp}${this.nonce}${this.prevHash}${this.data}`
  }
}

export default Block
