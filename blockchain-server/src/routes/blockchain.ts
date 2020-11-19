import express from 'express'
import {
  distribute,
  mine,
  synchronizeChain,
  synchronizeNode,
  synchronize
} from '../middleware/BlockchainController'

const blockchain = express.Router()

blockchain.post('/distribute', distribute)

blockchain.post('/node/synchronize', synchronizeNode)

blockchain.post('/synchronize', synchronizeChain)

blockchain.post('/mine', mine)

export function synchronizeOnInit () {
  synchronize()
}

export default blockchain
