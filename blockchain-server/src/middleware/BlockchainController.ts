import express from 'express'
import BlockchainFacade from '../facade/BlockchainFacade'

const blockchain = new BlockchainFacade()

export function distribute (req: express.Request, res: express.Response) {
  const { candidate_name } = req.body
  const vote = { candidate_name }

  blockchain.distributeVote(vote)
  blockchain.mine(candidate_name)

  res.send()
}

export function synchronizeNode (req: express.Request, res: express.Response) {
  const { chain } = req.body
  blockchain.synchronizeNode(chain)

  res.send()
}

export function synchronize () {
  blockchain.synchronizeOnInit()
}

export function synchronizeChain (req: express.Request, res: express.Response) {
  blockchain.synchronizeChain()
  res.send()
}

export function mine (req: express.Request, res: express.Response) {
  console.log(req.body)
  const { candidate_name } = req.body

  blockchain.mine(candidate_name)
  res.send()
}
