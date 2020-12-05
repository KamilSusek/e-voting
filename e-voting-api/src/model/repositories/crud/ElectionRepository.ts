import { PrismaClient } from '@prisma/client'
import Database from '../../database/Database'
import BaseElectionDTO from '../dtos/election/BaseElectionDTO'

interface Election {
  election_name: string
  election_description: string
  start_date: string
  end_date: string
  server_url: string
  isTimeElaspsed?: boolean
}

class ElectionRepository {
  private db: PrismaClient

  constructor () {
    this.db = Database.getInstance().getDatabase()
  }

  public async findAll (): Promise<any[]> {
    return await this.db.election.findMany()
  }

  public async findById (id: number) {
    return await this.db.election.findOne({
      where: {
        id: id
      }
    })
  }

  public async findByElectionName (electionName: string) {
    return await this.db.election.findOne({
      where: {
        election_name: electionName
      }
    })
  }

  public async save (election: Election) {
    return await this.db.election.create({ data: election })
  }
}

export default ElectionRepository
