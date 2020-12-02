import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import peers from './routes/peers'
import blockchain from './routes/blockchain'
import score from './routes/score'
import { synchronizeOnInit } from './routes/blockchain'

const HTTP_PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(peers)
app.use(blockchain)
app.use(score)

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}.`)
  synchronizeOnInit()
})

/**
 * npm run start
 * $env:HTTP_PORT = 3002; $env:P2P_PORT = 5002; $env:PEERS = 'ws://localhost:5001'; npm run start
 * $env:HTTP_PORT = 3003; $env:P2P_PORT = 5003; $env:PEERS = 'ws://localhost:5002,ws://localhost:5001'; npm run start
 */
