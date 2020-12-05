import CandidatesRepo from '../../model/repositories/CandidatesRepo'
import ElectionsRepo from '../../model/repositories/ElectionsRepo'
import VotersRepo from '../../model/repositories/VotersRepo'
import axios from 'axios'
import express from 'express'

interface VotingResult {
  candidate_name: string
  voteCounter: number
}
const electionsRepository: ElectionsRepo = new ElectionsRepo()
const candidatesRepo: CandidatesRepo = new CandidatesRepo()
const voters: VotersRepo = new VotersRepo()

export async function findElectionFromParams (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { electionName } = req.params
    const election = await electionsRepository.findByElectionName(electionName)

    if (election) {
      req.body.electionName = electionName
      req.body.election = election
      next()
    } else {
      res.status(401).send()
    }
  } catch (error) {
    console.log(error)
  }
}

export async function prepareScores (
  req: express.Request,
  res: express.Response,
  next: any
) {
  const { election, electionName } = req.body

  const response = await axios.get(`${election.server_url}/score`)

  const candidates = await candidatesRepo.findCandidatesByElectionName(
    electionName
  )

  if (response.data && candidates) {
    req.body.scores = response.data
    req.body.candidates = candidates
    next()
  } else {
    res.status(401).send()
  }
}

export async function calculateScore (
  req: express.Request,
  res: express.Response,
  next: any
) {
  const { scores, candidates } = req.body
  const scoresArray: [] = scores
  const countedVotes: VotingResult[] = new Array()

  candidates.forEach(({ candidate_name }: any) => {
    const matchingVotes = scoresArray.filter(
      (item: any) => item === candidate_name
    )

    const voteCounter = matchingVotes.length
    countedVotes.push({ candidate_name, voteCounter })
  })
  console.log(countedVotes)
  res.status(200).send(countedVotes)
}
