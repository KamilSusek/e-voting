import Database from '../database/Database'
import express from 'express'

export async function attachVoterToElections (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { voterName, electionName } = req.body
    const db = Database.getInstance().getDatabase()

    const election = await db.election.findOne({
      where: {
        election_name: electionName
      }
    })
    const voter = await db.voter.findOne({
      where: {
        username: voterName
      }
    })
    if (election && voter) {
      db.user_Election.create({
        data: {
          Election: {
            connect: {
              id: election.id
            }
          },
          Voter: {
            connect: {
              id: voter.id
            }
          }
        }
      })
      res.send()
    } else {
      res.status(406).send()
    }
  } catch (error) {
    res.status(400).send()
  }
}
