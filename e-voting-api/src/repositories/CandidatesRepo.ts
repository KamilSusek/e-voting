import { PrismaClient } from '@prisma/client'
import Database from '..//database/Database'

interface CandidateDTO {
  candidate_name: string
  candidate_description: string
}

class CandidatesRepo {
  private db: PrismaClient

  constructor () {
    this.db = Database.getInstance().getDatabase()
  }

  async findAll () {
    const array = await this.db.candidate.findMany({
      select: {
        candidate_name: true,
        candidate_description: true
      }
    })

    return array
  }

  async findCandidatesByElectionName (name: string) {
    const election = await this.db.election.findOne({
      where: {
        election_name: name
      }
    })

    const candidates = await this.db.candidate.findMany({
      where: {
        election_id: election.id
      }
    })

    return candidates
  }

  //   public async save(candidate: CandidateDTO) {}

  public async saveCandidateToElection (
    candidate: CandidateDTO,
    electionName: string
  ) {
    const election = await this.db.election.findOne({
      where: {
        election_name: electionName
      }
    })

    if (election && candidate) {
      const response = await this.db.candidate.create({
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

      return response
    } else {
      throw new Error()
    }
  }
}

export default CandidatesRepo