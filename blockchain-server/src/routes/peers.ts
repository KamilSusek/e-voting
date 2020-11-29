import express from 'express'
import PeersRepo from '../model/Peers'
import { getPeers, ping, registerPeer } from '../middleware/PeersController'

const HTTP_PORT = process.env.HTTP_PORT || 3001

const peers = express.Router()
const peerRepo = PeersRepo.getInstance()

// if (HTTP_PORT === 3001) {
//   const p = peerRepo.getPeers()
//   p.push('http://localhost:3002')
//   p.push('http://localhost:3003')
//   peerRepo.setPeers(p)
// }
// if (HTTP_PORT === '3002') {
//   const p = peerRepo.getPeers()
//   p.push('http://localhost:3001')
//   p.push('http://localhost:3003')
//   peerRepo.setPeers(p)
// }
// if (HTTP_PORT === '3003') {
//   const p = peerRepo.getPeers()
//   p.push('http://localhost:3001')
//   p.push('http://localhost:3002')
//   peerRepo.setPeers(p)
// }

peers.get('/ping', ping)

peers.get('/peers', getPeers)

peers.post('/register', registerPeer)

export default peers
