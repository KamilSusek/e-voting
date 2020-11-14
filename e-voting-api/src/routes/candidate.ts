import express from 'express'
import CandidatesRepo from '../repository/implementation/CandidatesRepo'

const router = express.Router()

const candidates = new CandidatesRepo()

router.get('/candidates', async (req, res) => {
  try {
    const response = await candidates.findAll()
    res.send(response)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/candidates/:electionName', async (req, res) => {
  try {
    const { electionName } = req.params
    const response = await candidates.findCandidatesByElectionName(electionName)
    res.send(response)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
})

router.post('/candidate/set_election', async (req, res) => {
  try {
    const { candidate_name, candidate_description, electionName } = req.body
    const response = await candidates.saveCandidateToElection(
      { candidate_name, candidate_description },
      electionName
    )

    res.send(response)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
})

export default router
