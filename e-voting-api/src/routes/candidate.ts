import express from 'express'
import {
  getAllCandidates,
  getCandidateElection
} from '../middleware/candidates/findCandidates'

const router = express.Router()

router.get('/candidates', getAllCandidates)

router.get('/candidates/:electionName', getCandidateElection)

// router.post('/candidate/set_election')

export default router
