import { SHA256 } from 'crypto-js'

const DIFFICULTY = 5

class Block {
  private index: number
  private timestamp: string
  private nonce: number
  private prevHash: string
  private data: any

  constructor (
    index: number,
    timestamp: string,
    nonce: number,
    prevHash: string,
    data: any
  ) {
    this.index = index
    this.timestamp = timestamp
    this.nonce = nonce
    this.prevHash = prevHash
    this.data = data
  }

  public getIndex (): number {
    return this.index
  }

  public getTimestamp (): string {
    return this.timestamp
  }

  public getNonce (): number {
    return this.nonce
  }

  public getPrevHash (): string {
    return this.prevHash
  }

  public getData (): any {
    return this.data
  }

  public toString (): string {
    return `${this.index}${this.timestamp}${this.nonce}${this.prevHash}${this.data}`
  }
}

export default Block
