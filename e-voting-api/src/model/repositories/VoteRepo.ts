import Database from '../database/Database'
import moment from 'moment'
import CandidateRepository from './crud/CandidateRepository'
import ElectionRepository from './crud/ElectionRepository'
import { PrismaClient } from '@prisma/client'
import VoterRepository from './crud/VoterRepository'
import VoterElectionRepository from './crud/VoterElectionRepository'

class VoteRepo {
  private candidateRepository: CandidateRepository
  private electionRepository: ElectionRepository
  private voterRepository: VoterRepository
  private voterElectionRepository: VoterElectionRepository

  constructor () {
    this.candidateRepository = new CandidateRepository()
    this.electionRepository = new ElectionRepository()
    this.voterRepository = new VoterRepository()
    this.voterElectionRepository = new VoterElectionRepository()
  }

  async registerVote (
    username: string,
    electionName: string
  ): Promise<boolean> {
    const db = Database.getInstance().getDatabase()

    const voter = await this.voterRepository.findByUsername(username)

    const election = await this.electionRepository.findByElectionName(
      electionName
    )

    const votersWithElections = await this.voterElectionRepository.findAll()

    const matchingRow = votersWithElections.find((item: any) => {
      if (item.election_id === election.id && item.voter_id === voter.id)
        return item
    })

    console.log(matchingRow)

    // Alredy voted
    if (matchingRow.didVote) {
      return false
    } else {
      // TODO ADD UPDATE METHOD TO VOTE REPOSITORY
      await db.user_Election.update({
        where: {
          id: matchingRow.id
        },
        data: {
          didVote: true
        }
      })
      return true
    }
  }
}

export default VoteRepo
