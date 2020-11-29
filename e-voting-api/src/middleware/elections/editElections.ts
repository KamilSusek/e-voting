import Database from '../../database/Database'
import express from 'express'

export async function deleteElection (
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

    await db.user_Election.deleteMany({
      where: {
        election_id: election.id
      }
    })

    await db.candidate.deleteMany({
      where: {
        election_id: election.id
      }
    })

    await db.election.delete({
      where: {
        id: election.id
      }
    })

    res.send()
  } catch (error) {
    res.status(400).send()
  }
}

export async function setServerUrl (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { electionName, serverUrl } = req.body

    const db = Database.getInstance().getDatabase()
    const election = await db.election.update({
      where: {
        election_name: electionName
      },
      data: {
        server_url: serverUrl
      }
    })
    console.log(election)
    res.send()
  } catch (error) {
    console.log(error)
    res.status(400).send()
  }
}

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
