import { Candidate, Election, PrismaClient } from '@prisma/client'
import Database from '../../database/Database'
import BaseCandidateDTO from '../dtos/candidate/BaseCandidateDTO'

interface CandidateDTO {
  candidate_name: string
  candidate_description: string
}

class CandidateRepository {
  private db: PrismaClient

  constructor () {
    this.db = Database.getInstance().getDatabase()
  }

  public async findAll () {
    const dto = BaseCandidateDTO.dto

    return await this.db.candidate.findMany({ select: dto })
  }

  public async findByName (candidateName: string) {
    const dto = BaseCandidateDTO.dto

    return await this.db.candidate.findFirst({
      where: {
        candidate_name: candidateName
      },
      select: dto
    })
  }

  public async findByElectionId (electionId: number) {
    return await this.db.candidate.findMany({
      where: {
        id: electionId
      }
    })
  }

  public async save (candidate: CandidateDTO, election: Election) {
    await this.db.candidate.create({
      data: {
        candidate_name: candidate.candidate_name,
        candidate_description: candidate.candidate_description,
        Election: {
          connect: {
            id: election.id
          }
        }
      }
    })
  }
}

export default CandidateRepository
