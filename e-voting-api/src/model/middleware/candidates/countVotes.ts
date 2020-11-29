import Database from '../../database/Database'
import express from 'express'

export async function countVotes (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { electionName } = req.params
    const db = Database.getInstance().getDatabase()

    const election = await db.election.findOne({
      where: { election_name: electionName }
    })

    if (election.is_published === true) {
      const candidates = await db.candidate.findMany({
        where: { election_id: election.id },
        select: {
          candidate_name: true,
          votes: true
        }
      })
      res.send(candidates)
    } else {
      res.status(406).send()
    }
  } catch (error) {
    res.status(400).send()
  }
}
