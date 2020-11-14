import express from 'express'
import ElectionsRepo from '../repository/implementation/ElectionsRepo'
import {
  attachVotersToElection,
  createCandidates,
  createElection,
  validate
} from '../middleware/createElection'
import { attachVoterToElections } from '../middleware/editElections'
import {
  getAllElections,
  getEllectionByName,
  getEllectionsByVoter
} from '../middleware/findElections'

const router = express.Router()

const elections = new ElectionsRepo()

router.get('/elections', getAllElections)

router.get('/elections/:voterName', getEllectionsByVoter)

router.get('/election/:electionName', getEllectionByName)

router.post(
  '/election',
  validate,
  createElection,
  createCandidates,
  attachVotersToElection
)

router.post('/election/set_user', attachVoterToElections)

// TODO
router.post('/election/publish', elections.publishElectionResult)

export default router
