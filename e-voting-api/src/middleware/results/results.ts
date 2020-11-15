import Database from '../../database/Database'
import express from 'express'
import axios from 'axios'

export async function publishElectionResult (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { electionName } = req.body
    const db = Database.getInstance().getDatabase()
    const election = await db.election.findOne({
      where: {
        election_name: electionName
      }
    })

    const candidates = await db.candidate.findMany({
      where: {
        election_id: election.id
      },
      select: {
        id: true,
        candidate_name: true
      }
    })

    const scores = await axios.get(`${election.server_url}/score`)
    const scoresArray: any[] = scores.data
    // temp remove empty element
    scoresArray.shift()
    console.log(scoresArray, candidates)
    for (const candidate of candidates) {
      const matchingRows = scoresArray.filter(item => {
        if (item === candidate.candidate_name) {
          return -1
        }
      })
      console.log(matchingRows.length)
      await db.candidate.update({
        where: { id: candidate.id },
        data: {
          votes: matchingRows.length
        }
      })
    }
    await setResultsAsPublished(election.id)

    res.send()
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

export async function getResults (
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
          votes: true
        }
      })
      res.send(candidates)
    } else {
      res.status(404).send()
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

async function setResultsAsPublished (id: number) {
  const db = Database.getInstance().getDatabase()
  await db.election.update({
    where: { id },
    data: {
      is_published: true
    }
  })
}
