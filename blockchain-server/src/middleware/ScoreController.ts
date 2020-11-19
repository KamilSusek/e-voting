import { Response, Request } from 'express'
import BlockchainFacade from '../facade/BlockchainFacade'

const blockchain = new BlockchainFacade()

export function getScore (req: Request, res: Response) {
  const scores = blockchain.getScore()

  res.send(scores)
}
