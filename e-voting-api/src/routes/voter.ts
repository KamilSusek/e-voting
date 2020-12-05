import express from 'express'
import {
  findElectionFromParams,
  prepareScores,
  calculateScore
} from '../middleware/results/score'
import { sendVote, registerVote, validate } from '../middleware/vote/sendVote'
import { saveVoter } from '../middleware/voter/saveVoter'
import { findVoterFromParams } from '../middleware/voter/voters'
import { findVoterAttachedToElection } from '../middleware/voter/voters'
import { findAllVoters } from '../middleware/voter/voters'
import { login } from '../middleware/voter/voters'
import { countVotes } from '../middleware/candidates/countVotes'
import { ensureAdmin, ensureToken, ensureUser, verifyToken } from './auth'

const router = express.Router()

router.get('/voters', ensureToken, verifyToken, ensureAdmin, findAllVoters)

router.get(
  '/voters/:electionName',
  ensureToken,
  verifyToken,
  ensureAdmin,
  findVoterAttachedToElection
)

router.get(
  '/voter/:username',
  ensureToken,
  verifyToken,
  ensureAdmin,
  findVoterFromParams
)

router.get(
  '/voting/result/:electionName',
  ensureToken,
  verifyToken,
  ensureAdmin,
  countVotes
)

router.post('/voter', ensureToken, verifyToken, ensureAdmin, saveVoter)

router.post(
  '/send-vote',
  ensureToken,
  verifyToken,
  ensureUser,
  validate,
  registerVote,
  sendVote
)

router.get(
  '/score/:electionName',
  ensureToken,
  verifyToken,
  findElectionFromParams,
  prepareScores,
  calculateScore
)

export default router
