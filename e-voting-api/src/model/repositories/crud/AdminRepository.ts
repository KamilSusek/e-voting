import { PrismaClient } from '@prisma/client'
import Database from '../../database/Database'
import ICRUDRepository from './ICRUDRepository'

interface Admin {
  username: string
  password: string
}

class AdminRepository implements ICRUDRepository {
  private db: PrismaClient

  constructor () {
    this.db = Database.getInstance().getDatabase()
  }

  public async findAll () {
    return await this.db.aDMIN.findMany()
  }

  public async findById (id: number) {
    return await this.db.aDMIN.findOne({
      where: {
        id: id
      }
    })
  }

  public async findByUsername (username: string) {
    return await this.db.aDMIN.findOne({
      where: {
        username: username
      }
    })
  }

  public async save (entity: Admin) {
    return this.db.aDMIN.create({
      data: entity
    })
  }
}

export default AdminRepository
