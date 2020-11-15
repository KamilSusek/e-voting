import express from 'express'
import {
  findElectionFromParams,
  prepareScores,
  calculateScore
} from '../services/vote/score'
import { sendVote, registerVote, validate } from '../services/vote/sendVote'
import { saveVoter } from '../services/vote/saveVoter'
import { findVoterFromParams } from '../services/vote/voters'
import { findVoterAttachedToElection } from '../services/vote/voters'
import { findAllVoters } from '../services/vote/voters'
import { login } from '../services/vote/voters'

const router = express.Router()

router.post('/login', login)

router.get('/voters', findAllVoters)

router.get('/voters/:electionName', findVoterAttachedToElection)

router.get('/voter/:username', findVoterFromParams)

router.post('/voter', saveVoter)

router.post('/send-vote', validate, registerVote, sendVote)

router.get(
  '/score/:electionName',
  findElectionFromParams,
  prepareScores,
  calculateScore
)

export default router
