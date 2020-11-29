import express from 'express'
import {
  getAllCandidates,
  getCandidateElection
} from '../model/middleware/candidates/findCandidates'

const router = express.Router()

router.get('/candidates', getAllCandidates)

router.get('/candidates/:electionName', getCandidateElection)

export default router
