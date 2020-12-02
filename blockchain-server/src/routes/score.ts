import express from 'express'
import { getScore } from '../middleware/score'

const score = express.Router()

score.get('/score', getScore)

export default score
