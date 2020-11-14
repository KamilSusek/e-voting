import express from 'express'
import axios from 'axios'
import VoteRepo from '../../repository/implementation/VoteRepo'
import ElectionsRepo from '../../repository/implementation/ElectionsRepo'

const voteRepo: VoteRepo = new VoteRepo()
const electionsRepo: ElectionsRepo = new ElectionsRepo()

export async function registerVote (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { username, electionName } = req.body
    if (username && electionName) {
      const response = await voteRepo.registerVote(username, electionName)
      if (response) {
        next()
      } else {
        res.status(403).send()
      }
    } else {
      res.status(406).send()
    }
  } catch (error) {
    console.log(error)
  }
}

export async function sendVote (
  req: express.Request,
  res: express.Response,
  next: any
) {
  const { electionName, vote } = req.body
  const election = await electionsRepo.findByElectionName(electionName)
  console.log('election', election, 'vote', vote)
  if (election) {
    axios.post(`${election.server_url}/distribute`, vote).catch(error => {
      res.status(400).send()
    })
  }

  res.status(200).send()
}
