import { Response, Request } from 'express'
import PeersService from '../model/service/PeersService'
import RequiredBodyNotFoundError from '../model/errors/product/RequiredBodyNotFoundError'

const peersService = new PeersService()

export async function ping (req: Request, res: Response) {
  res.send('ok')
}

export async function getPeers (req: Request, res: Response) {
  const peers = peersService.getAllPeers()

  res.send(peers)
}

export async function registerPeer (req: Request, res: Response) {
  const { url } = req.body
  if (url) {
    peersService.addNewPeer(url)
    res.send()
  } else {
    const error = new RequiredBodyNotFoundError()
    const { statusCode, errorMessage } = error.getError()

    res.status(statusCode).send(errorMessage)
  }
}
