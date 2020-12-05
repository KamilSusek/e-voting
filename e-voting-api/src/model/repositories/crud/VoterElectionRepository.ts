import { PrismaClient } from '@prisma/client'
import Database from '../../database/Database'
import ICRUDRepository from './ICRUDRepository'

interface VoterElection {
  election_id: number
  voter_id: number
}

class VoterElectionRepository implements ICRUDRepository {
  private db: PrismaClient

  constructor () {
    this.db = Database.getInstance().getDatabase()
  }

  public async findAll () {
    return this.db.user_Election.findMany()
  }

  public async findById (id: number) {
    return this.db.user_Election.findMany({
      where: {
        id: id
      }
    })
  }

  public async findManyByElectionId(id:number){
    return await this.db.user_Election.findMany({
      where: {
        election_id: id
      },
      select: {
        Voter: {
          select: {
            username: true
          }
        }
      }
    })
  }

  public async save (entity: VoterElection) {
    return this.db.user_Election.create({
      data: {
        Election: {
          connect: {
            id: entity.election_id
          }
        },
        Voter: {
          connect: {
            id: entity.voter_id
          }
        }
      }
    })
  }
}

export default VoterElectionRepository
