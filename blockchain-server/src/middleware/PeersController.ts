import axios from 'axios'
import { Response, Request } from 'express'
import BlockchainFacade from '../facade/BlockchainFacade'

const blockchain = new BlockchainFacade()

export async function ping (req: Request, res: Response) {
  res.send('ok')
}

export async function getPeers (req: Request, res: Response) {
  const peers = blockchain.getAllPeers()

  res.send(peers)
}

export async function registerPeer (req: Request, res: Response) {
  const { url } = req.body
  blockchain.addNewPeer(url)
  res.send()
}
