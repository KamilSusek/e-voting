import express from 'express'
import axios from 'axios'
import Database from '../../database/Database'
import ElectionsRepo from '../../repositories/ElectionsRepo'

const electionsRepo = new ElectionsRepo()

export async function validate (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { username, electionName } = req.body
    if (username && electionName) {
      next()
    } else {
      res.status(406).send()
    }
  } catch (error) {
    console.log(error)
  }
}

export async function registerVote (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { username, electionName } = req.body

    const db = Database.getInstance().getDatabase()

    const voter = await db.voter.findOne({
      where: {
        username
      }
    })

    const election = await db.election.findOne({
      where: {
        election_name: electionName
      }
    })

    const votersWithElections = await db.user_Election.findMany()
    const matchingRow = votersWithElections.find((item: any) => {
      if (item.election_id === election.id && item.voter_id === voter.id)
        return item
    })

    console.log(matchingRow)

    // Alredy voted
    if (matchingRow.didVote) {
      res.status(403).send()
    } else {
      await db.user_Election.update({
        where: {
          id: matchingRow.id
        },
        data: {
          didVote: true
        }
      })
      next()
    }
  } catch (error) {
    res.status(406).send()
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
