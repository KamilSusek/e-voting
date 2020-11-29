import express from 'express'
import {
  findElectionFromParams,
  prepareScores,
  calculateScore
} from '../model/middleware/results/score'
import { sendVote, registerVote, validate } from '../model/middleware/vote/sendVote'
import { saveVoter } from '../model/middleware/voter/saveVoter'
import { findVoterFromParams } from '../model/middleware/voter/voters'
import { findVoterAttachedToElection } from '../model/middleware/voter/voters'
import { findAllVoters } from '../model/middleware/voter/voters'
import { login } from '../model/middleware/voter/voters'
import { countVotes } from '../model/middleware/candidates/countVotes'

const router = express.Router()

router.post('/login', login)

router.get('/voters', findAllVoters)

router.get('/voters/:electionName', findVoterAttachedToElection)

router.get('/voter/:username', findVoterFromParams)

router.get('/voting/result/:electionName', countVotes)

router.post('/voter', saveVoter)

router.post('/send-vote', validate, registerVote, sendVote)

router.get(
  '/score/:electionName',
  findElectionFromParams,
  prepareScores,
  calculateScore
)

export default router

