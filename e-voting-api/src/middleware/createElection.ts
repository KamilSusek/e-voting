import Database from '../database/Database'
import express from 'express'


export async function validate (
  req: express.Request,
  res: express.Response,
  next: any
) {
  const { election, candidates, voters } = req.body
  if (election && candidates && voters) {
    next()
  } else {
    res.status(406).send()
  }
}

export async function createElection (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { election } = req.body
    const db = Database.getInstance().getDatabase()
    const response = await db.election.create({ data: election })
    req.body.electionId = response.id
    next()
  } catch (error) {
    res.status(400).send()
    console.log(error)
  }
}

export async function createCandidates (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { candidates, electionId } = req.body
    const db = Database.getInstance().getDatabase()
    for (const item of candidates) {
      await db.candidate.create({
        data: {
          candidate_name: item.candidate_name,
          candidate_description: item.candidate_description,
          Election: {
            connect: {
              id: electionId
            }
          }
        }
      })
    }

    next()
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
}

export async function attachVotersToElection (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { voters, electionId } = req.body
    const db = Database.getInstance().getDatabase()
    for (const item of voters) {
      const voter = await db.voter.findOne({
        where: {
          username: item.username
        }
      })

      await db.user_Election.create({
        data: {
          Election: {
            connect: {
              id: electionId
            }
          },
          Voter: {
            connect: {
              id: voter.id
            }
          }
        }
      })
    }

    res.status(201).send()
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
}
