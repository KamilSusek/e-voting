import { PrismaClient } from '@prisma/client'
import Database from '../database/Database'
import CandidateRepository from './crud/CandidateRepository'
import ElectionRepository from './crud/ElectionRepository'
import FullCandidateDTO from './dtos/candidate/FullCandidateDTO'

interface CandidateDTO {
  candidate_name: string
  candidate_description: string
}

class CandidatesRepo {
  private candidateRepository: CandidateRepository
  private electionRepository: ElectionRepository

  constructor () {
    this.candidateRepository = new CandidateRepository()
    this.electionRepository = new ElectionRepository()
  }

  async findAll () {
    return await this.candidateRepository.findAll()
  }

  async findCandidatesByElectionName (electionName: string) {
    const election = await this.electionRepository.findByElectionName(
      electionName
    )

    const candidates = await this.candidateRepository.findByElectionId(
      election.id
    )

    return candidates
  }

  public async saveCandidateToElection (
    candidate: CandidateDTO,
    electionName: string
  ) {
    const election = await this.electionRepository.findByElectionName(
      electionName
    )

    if (election && candidate) {
      const response = await this.candidateRepository.save(candidate, election)

      return response
    } else {
      throw new Error()
    }
  }
}

export default CandidatesRepo
