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

const router = express.Router()

router.get('/elections', getAllElections)

router.get('/elections/:voterName', getEllectionsByVoter)

router.get('/election/:electionName', getEllectionByName)

router.get('/serverUrl', getEllectionByServerUrl)

router.post(
  '/election',
  validate,
  createElection,
  createCandidates,
  attachVotersToElection
)

router.post('/election/set_user', attachVoterToElections)

router.post(
  '/election/publish',
  findElection,
  findCandidates,
  fetchResults,
  countVotes
)

router.post('/changeUrl', setServerUrl)

router.delete('/election', deleteElection)

router.get('/results/:electionName', getResults)

export default router
