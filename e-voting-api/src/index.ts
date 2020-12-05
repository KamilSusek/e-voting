import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import voterRoutes from './routes/voter'
import electionRoutes from './routes/election'
import candidateRoutes from './routes/candidate'
import auth from './routes/auth'
import CandidateRepository from './model/repositories/crud/CandidateRepository'

const PORT = process.env.PORT || 8080

const app = express()

const candidateRepo = new CandidateRepository()

app.use(bodyParser())
app.use(cors())
// Routes
app.use(auth)
app.use(voterRoutes)
app.use(electionRoutes)
app.use(candidateRoutes)

app.get('/repo', async (req, res) => {
  const response = candidateRepo.findAll()

  res.send(response)
})

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`)
})
