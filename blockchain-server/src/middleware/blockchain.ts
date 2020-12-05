import express from 'express'
import PeersService from '../model/service/PeersService'
import BlockchainService from '../model/service/BlockchainService'
import ScoreService from '../model/service/ScoreService'
import RequiredBodyNotFoundError from '../model/errors/product/RequiredBodyNotFoundError'
import NodeConfig from '../model/config/NodeConfig'

const blockchainService = new BlockchainService()
const peersService = new PeersService()
const scoreService = new ScoreService()

export function getServerInfo (req: express.Request, res: express.Response) {
  /** Stored peers plus current peer. */
  const nodes = peersService.getAllPeers().length + 1
  const addedBlocks = scoreService.getScore().length
  const consensus = NodeConfig.getInstance().getConsensusAlgorithmInfo()

  const info = {
    addedBlocks,
    nodes,
    consensus
  }

  res.send(info)
}

export function distribute (req: express.Request, res: express.Response) {
  const { candidate_name } = req.body
  if (candidate_name) {
    const vote = { candidate_name }

    blockchainService.distributeVote(vote)
    blockchainService.mine(candidate_name)

    res.send()
  } else {
    const error = new RequiredBodyNotFoundError()
    const { statusCode, errorMessage } = error.getError()

    res.status(statusCode).send(errorMessage)
  }
}

export function synchronizeNode (req: express.Request, res: express.Response) {
  const { chain, syncValue } = req.body
  if (chain && syncValue) {
    blockchainService.synchronizeNode(syncValue, chain)

    res.send()
  } else {
    const error = new RequiredBodyNotFoundError()
    const { statusCode, errorMessage } = error.getError()

    res.status(statusCode).send(errorMessage)
  }
}

export function synchronize () {
  blockchainService.synchronizeOnInit()
}

export function synchronizeChain (req: express.Request, res: express.Response) {
  blockchainService.synchronizeChain()
  res.send()
}

export function mine (req: express.Request, res: express.Response) {
  const { candidate_name } = req.body

  if (candidate_name) {
    blockchainService.mine(candidate_name)
    res.send()
  } else {
    const error = new RequiredBodyNotFoundError()
    const { statusCode, errorMessage } = error.getError()

    res.status(statusCode).send(errorMessage)
  }
}
