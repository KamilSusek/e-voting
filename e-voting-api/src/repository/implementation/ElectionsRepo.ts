import Database from '../../database/Database'
import moment from 'moment'
import express from 'express'
import axios from 'axios'

interface ElectionDTO {
  election_name: string
  election_description: string
  start_date: string
  end_date: string
  server_url: string
  isTimeElaspsed?: boolean
}

class ElectionsRepo {
  async findAll (): Promise<any[]> {
    const db = Database.getInstance().getDatabase()
    const array = await db.election.findMany({
      select: {
        election_name: true,
        election_description: true,
        start_date: true,
        end_date: true
      }
    })

    const retVal: ElectionDTO[] = new Array()

    array.forEach(item => {
      const now = moment()
      const endDate = moment(item.end_date)

      const electionDTO: any = {
        ...item,
        isTimeElaspsed: endDate < now
      }
      retVal.push(electionDTO)
    })

    return retVal
  }

  async findByElectionName (electionName: string) {
    const db = Database.getInstance().getDatabase()

    const value = await db.election.findOne({
      where: {
        election_name: electionName
      }
    })

    return value
  }

  async findElectionsForVoter (voterName: string) {
    const db = Database.getInstance().getDatabase()

    const voter = await db.voter.findOne({
      where: {
        username: voterName
      }
    })

    const electionsIds = await db.user_Election.findMany({
      where: {
        voter_id: voter.id
      },
      select: {
        Election: {
          select: {
            election_name: true,
            election_description: true,
            start_date: true,
            end_date: true,
            server_url: true
          }
        },
        didVote: true
      }
    })

    const elections: {
      election_name: string
      election_description: string
      start_date: string
      end_date: string
      server_url: string
      isTimeElaspsed: boolean
      didVote: boolean
    }[] = []

    electionsIds.forEach(item => {
      const {
        election_name,
        election_description,
        start_date,
        end_date,
        server_url
      } = item.Election
      const didVote = item.didVote
      const now = moment()
      const end = moment(end_date)

      elections.push({
        election_name,
        election_description,
        start_date,
        end_date,
        server_url,
        isTimeElaspsed: end < now ? true : false,
        didVote
      })
    })

    return elections
  }

  async setElectionToVoter (voterName: string, electionName: string) {
    try {
      const db = Database.getInstance().getDatabase()

      const voter = await db.voter.findOne({
        where: {
          username: voterName
        }
      })

      const election = await db.election.findOne({
        where: {
          election_name: electionName
        }
      })

      if (voter && election) {
        const resp = await db.user_Election.create({
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
        return resp
      } else {
        throw new Error()
      }
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async findIfUserDidVote (votername: string) {
    const db = Database.getInstance().getDatabase()

    db.voter
      .findOne({
        where: {
          username: votername
        }
      })
      .then(voter => {
        db.user_Election
          .findOne({
            where: {
              id: voter.id
            }
          })
          .then(userElection => {
            console.log(userElection)
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  async findVoterElection () {
    try {
      const db = Database.getInstance().getDatabase()
      const results = await db.user_Election.findMany()
      console.log(results)
    } catch (error) {
      console.log(error)
    }
  }

  async publishElectionResult (
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
      const scoresArray: [] = scores.data
      scoresArray.shift()

      console.log(scores.data)

      res.send(scores.data)
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  }

  async save (election: ElectionDTO) {
    try {
      const db = Database.getInstance().getDatabase()

      const res = await db.election.create({ data: election })
      return res
    } catch (error) {
      throw new Error()
    }
  }
}

export default ElectionsRepo
