import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import voterRoutes from './routes/voter'
import electionRoutes from './routes/election'
import candidateRoutes from './routes/candidate'
import auth from './routes/auth'

const PORT = process.env.PORT

const app = express()

app.use(bodyParser())
app.use(cors())
// Routes
app.use(auth)
app.use(voterRoutes)
app.use(electionRoutes)
app.use(candidateRoutes)

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`)
})
