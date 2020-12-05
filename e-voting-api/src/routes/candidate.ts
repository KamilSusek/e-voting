import express from 'express'
import {
  getAllCandidates,
  getCandidateElection
} from '../middleware/candidates/findCandidates'
import { ensureAdmin, ensureToken, verifyToken } from './auth'

const router = express.Router()

router.get(
  '/candidates',
  ensureToken,
  verifyToken,
  ensureAdmin,
  getAllCandidates
)

router.get(
  '/candidates/:electionName',
  ensureToken,
  verifyToken,
  getCandidateElection
)

export default router
