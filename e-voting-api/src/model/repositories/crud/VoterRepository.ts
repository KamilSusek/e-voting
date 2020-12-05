import { PrismaClient } from '@prisma/client'
import Database from '../../database/Database'

interface Voter {
  username: string
  password: string
}

class VoterRepository {
  private db: PrismaClient

  constructor () {
    this.db = Database.getInstance().getDatabase()
  }

  public async findAll () {
    return await this.db.voter.findMany()
  }

  public async findById (id: number) {
    return await this.db.voter.findOne({
      where: {
        id: id
      }
    })
  }

  public async findByUsername (username: string) {
    return await this.db.voter.findOne({
      where: { username: username }
    })
  }

  public async save (voter: Voter) {
    return await this.db.voter.create({ data: voter })
  }
}

export default VoterRepository
