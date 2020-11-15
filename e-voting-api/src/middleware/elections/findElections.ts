import Database from '../../database/Database'
import express from 'express'
import moment from 'moment'

export async function getAllElections (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const db = Database.getInstance().getDatabase()

    const elections = await db.election.findMany({
      select: {
        election_name: true,
        election_description: true,
        start_date: true,
        end_date: true,
        server_url: true,
        is_published: true
      }
    })

    res.send(elections)
  } catch (error) {
    res.status(400).send()
  }
}

export async function getEllectionByName (
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
      },
      select: {
        election_name: true,
        election_description: true,
        start_date: true,
        end_date: true,
        server_url: true,
        is_published: true
      }
    })
    res.send(election)
  } catch (error) {
    res.status(400).send()
  }
}

export async function getEllectionByServerUrl (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { serverUrl } = req.query
    const db = Database.getInstance().getDatabase()

    const elections = await db.election.findOne({
      where: {
        server_url: serverUrl.toString()
      },
      select: {
        election_name: true,
        election_description: true,
        start_date: true,
        end_date: true,
        server_url: true,
        is_published: true
      }
    })

    res.send(elections)
  } catch (error) {
    res.status(400).send()
  }
}

export async function getEllectionsByVoter (
  req: express.Request,
  res: express.Response,
  next: any
) {
  try {
    const { voterName } = req.params
    const db = Database.getInstance().getDatabase()

    const elections = await db.user_Election.findMany({
      where: {
        Voter: {
          username: voterName
        }
      },
      select: {
        Election: {
          select: {
            election_name: true,
            election_description: true,
            start_date: true,
            end_date: true,
            server_url: true,
            is_published: true
          }
        },
        didVote: true
      }
    })
    const responseData = transformToElectionsDTO(elections)
    console.log(responseData)
    res.send(responseData)
  } catch (error) {
    res.status(400).send()
  }
}

function transformToElectionsDTO (elections: any[]) {
  const retArray: any[] = []
  elections.forEach(item => {
    const {
      election_name,
      election_description,
      start_date,
      end_date,
      server_url,
      is_published
    } = item.Election
    const didVote = item.didVote
    const now = moment()
    const end = moment(end_date)

    retArray.push({
      election_name,
      election_description,
      start_date,
      end_date,
      server_url,
      is_published,
      isTimeElaspsed: end < now ? true : false,
      didVote
    })
  })
  return retArray
}
