import Database from '../database/Database'
import ElectionRepository from './crud/ElectionRepository'
import VoterElectionRepository from './crud/VoterElectionRepository'
import VoterRepository from './crud/VoterRepository'

interface VoterDTO {
  password: string
  username: string
}

class VotersRepo {
  private voterRepository: VoterRepository
  private electionRepository: ElectionRepository
  private voterElectionRepository: VoterElectionRepository

  constructor () {
    this.voterRepository = new VoterRepository()
    this.electionRepository = new ElectionRepository()
    this.voterElectionRepository = new VoterElectionRepository()
  }

  async findAll (): Promise<VoterDTO[]> {
    const voters = await this.voterRepository.findAll()

    return voters
  }

  async findByUsername (username: string): Promise<VoterDTO> {
    const value = await this.voterRepository.findByUsername(username)

    return value
  }

  async findVoterByElection (electionName: string) {
    const election = await this.electionRepository.findByElectionName(
      electionName
    )

    const voters = await this.voterElectionRepository.findManyByElectionId(
      election.id
    )

    const votersDTO: {
      username: string
    }[] = []

    voters.forEach((item: any) => {
      const { username } = item.Voter
      votersDTO.push({ username })
    })

    return votersDTO
  }

  async save (voter: VoterDTO) {
    const response = await this.voterRepository.save(voter)

    return response
  }
}

export default VotersRepo
