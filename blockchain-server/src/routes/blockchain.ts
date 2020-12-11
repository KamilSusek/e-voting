import express from 'express'
import {
  getServerInfo,
  distribute,
  mine,
  synchronizeChain,
  synchronizeNode,
  synchronize,
  getChain
} from '../middleware/blockchain'

const blockchain = express.Router()

blockchain.post('/distribute', distribute)

blockchain.post('/node/synchronize', synchronizeNode)

blockchain.post('/synchronize', synchronizeChain)

blockchain.post('/mine', mine)

blockchain.get('/info', getServerInfo)

blockchain.get('/chain', getChain)

export function synchronizeOnInit () {
  synchronize()
}

export default blockchain
