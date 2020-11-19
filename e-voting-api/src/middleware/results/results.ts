import Database from '../../database/Database'
import express from 'express'
import axios from 'axios'

export async function findElection (
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

    if (election.is_published === true) {
      res.status(406).send()
    } else {
      req.body.electionId = election.id
      req.body.serverUrl = election.server_url
      next()
    }
  } catch (error) {
    res.send(400).send(error)
  }
}

export async function findCandidates (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { electionId } = req.body
    const db = Database.getInstance().getDatabase()

    const candidates = await db.candidate.findMany({
      where: {
        election_id: electionId
      },
      select: {
        id: true,
        candidate_name: true
      }
    })

    if (candidates.length > 0) {
      req.body.candidates = candidates
      next()
    } else {
      res.status(406).send()
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function fetchResults (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const db = Database.getInstance().getDatabase()
    const { electionId, serverUrl, candidates } = req.body

    const scores = await axios.get(`${serverUrl}/score`)

    if (scores.data.length > 0) {
      const scoresArray: any[] = scores.data
      // temp remove empty element
      scoresArray.shift()
      req.body.scores = scoresArray
      next()
    } else {
      res.status(406).send()
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function countVotes (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const db = Database.getInstance().getDatabase()
    const { electionId, serverUrl, candidates, scores } = req.body
    for (const candidate of candidates) {
      const matchingRows = scores.filter((item: string) => {
        if (item === candidate.candidate_name) {
          return -1
        }
      })
      const votesCount = matchingRows.length

      await db.candidate.update({
        where: { id: candidate.id },
        data: {
          votes: votesCount
        }
      })
    }
    await setResultsAsPublished(electionId)

    res.send()
  } catch (error) {
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
