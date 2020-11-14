import express, { json } from 'express'
import bodyParser from 'body-parser'
import Blockchain from './model/blockchain/Blockchain'
import axios from 'axios'
import cors from 'cors'

const app = express()

app.use(cors())

interface Transaction {
  candidate: number
}

const HTTP_PORT = process.env.HTTP_PORT || 3001

const peers = new Array()

if (HTTP_PORT === 3001) {
  peers.push('http://localhost:3002')
  peers.push('http://localhost:3003')
}
if (HTTP_PORT === '3002') {
  peers.push('http://localhost:3001')
  peers.push('http://localhost:3003')
}
if (HTTP_PORT === '3003') {
  peers.push('http://localhost:3001')
  peers.push('http://localhost:3002')
}

let blockchain: Blockchain = new Blockchain('1')
const transactionPool = new Array<Transaction>()

app.use(bodyParser.json())

app.post('/register', (req, res) => {
  const { url } = req.body
  peers.push(url)
  res.send('ok')
})

app.get('/votes', (req, res) => {
  res.send(blockchain)
})

app.post('/distribute', (req, res) => {
  const { candidate_name } = req.body
  const vote = { candidate_name }

  console.log(vote)

  peers.forEach(peer => {
    axios.post(peer + `/mine`, vote).catch(err => {
      console.log(err)
    })
  })

  blockchain.mine(candidate_name)

  res.status(200).send()
})

app.post('/node/synchronize', (req, res) => {
  const { chain } = req.body

  if (chain.length > blockchain.getChainLength()) {
    blockchain = chain
  }

  res.send()
})

app.post('/synchronize', (req, res) => {
  peers.forEach(peer => {
    axios.post(peer + '/node/synchronize', { chain: blockchain }).catch(err => {
      console.log(err)
    })
  })
  res.status(200).send()
})

app.post('/mine', (req, res) => {
  const { candidate_name } = req.body
  console.log(candidate_name)
  blockchain.mine(candidate_name)

  res.status(200).send()
})

app.get('/score', (req, res) => {
  const array = new Array()

  blockchain.getChain().forEach(item => {
    const block = item.getData()
    array.push(block)
  })
  res.status(200).send(array)
})

const synchronize = () => {
  peers.forEach(async peer => {
    await axios.post(peer + '/synchronize')
  })
}

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}.`)
  console.log(peers)
  synchronize()
})

/**
 * npm run start
 * $env:HTTP_PORT = 3002; $env:P2P_PORT = 5002; $env:PEERS = 'ws://localhost:5001'; npm run start
 * $env:HTTP_PORT = 3003; $env:P2P_PORT = 5003; $env:PEERS = 'ws://localhost:5002,ws://localhost:5001'; npm run start
 */
