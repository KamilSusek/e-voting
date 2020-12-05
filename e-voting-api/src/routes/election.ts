import express from 'express'
import {
  attachVotersToElection,
  createCandidates,
  createElection,
  validate
} from '../middleware/elections/createElection'
import {
  attachVoterToElections,
  setServerUrl,
  deleteElection
} from '../middleware/elections/editElections'
import {
  getAllElections,
  getEllectionByName,
  getEllectionByServerUrl,
  getEllectionsByVoter
} from '../middleware/elections/findElections'
import {
  countVotes,
  fetchResults,
  findCandidates,
  findElection,
  getResults
} from '../middleware/results/results'
import { ensureAdmin, ensureToken, ensureUser, verifyToken } from './auth'

const router = express.Router()

router.get('/elections', ensureToken, verifyToken, getAllElections)

router.get(
  '/elections/:voterName',
  ensureToken,
  verifyToken,
  getEllectionsByVoter
)

router.get(
  '/election/:electionName',
  ensureToken,
  verifyToken,
  ensureAdmin,
  getEllectionByName
)

router.get(
  '/serverUrl',
  ensureToken,
  verifyToken,
  ensureAdmin,
  getEllectionByServerUrl
)

router.post(
  '/election',
  ensureToken,
  verifyToken,
  ensureAdmin,
  validate,
  createElection,
  createCandidates,
  attachVotersToElection
)

router.post(
  '/election/set_user',
  ensureToken,
  verifyToken,
  ensureAdmin,
  attachVoterToElections
)

router.post(
  '/election/publish',
  ensureToken,
  verifyToken,
  ensureAdmin,
  findElection,
  findCandidates,
  fetchResults,
  countVotes
)

router.post('/changeUrl', ensureToken, verifyToken, ensureAdmin, setServerUrl)

router.delete(
  '/election',
  ensureToken,
  verifyToken,
  ensureAdmin,
  deleteElection
)

router.get('/results/:electionName', ensureToken, verifyToken, getResults)

export default router
