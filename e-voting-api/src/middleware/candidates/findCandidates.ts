import express from 'express'
import Database from '../../model/database/Database'

export async function getAllCandidates (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const db = Database.getInstance().getDatabase()
    const candidates = await db.candidate.findMany()
    res.send(candidates)
  } catch (error) {
    res.status(400).send()
  }
}

export async function getCandidateElection (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { electionName } = req.params
    const db = Database.getInstance().getDatabase()

    const election = await db.election.findOne({
      where: {
        election_name: electionName
      }
    })

    if (election) {
      const candidates = await db.candidate.findMany({
        where: {
          election_id: election.id
        },
        select: {
          candidate_name: true,
          candidate_description: true,
          votes: true
        }
      })
      res.send(candidates)
    } else {
      res.status(404).send()
    }
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}
