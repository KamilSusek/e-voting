import Database from '../database/Database'

interface VoterDTO {
  password: string
  username: string
}

class VotersRepo {
  async findAll (): Promise<VoterDTO[]> {
    const db = Database.getInstance().getDatabase()

    const array = await db.voter.findMany({
      select: { username: true, password: true }
    })
    return array
  }

  async findByUsername (username: string): Promise<VoterDTO> {
    const db = Database.getInstance().getDatabase()
    const value = await db.voter.findOne({
      where: {
        username
      }
    })

    return value
  }

  async findVoterByElection (electionName: string) {
    const db = Database.getInstance().getDatabase()

    const election = await db.election.findOne({
      where: {
        election_name: electionName
      }
    })

    const voters = await db.user_Election.findMany({
      where: {
        election_id: election.id
      },
      select: {
        Voter: {
          select: {
            username: true
          }
        }
      }
    })

    const votersDTO: {
      username: string
    }[] = []

    voters.forEach((item: any) => {
      const { username } = item.Voter
      votersDTO.push({ username })
    })

    return votersDTO
  }

  //   findById() {}

  async save (voter: VoterDTO) {
    const db = Database.getInstance().getDatabase()

    const response = await db.voter.create({ data: voter })

    return response
  }

  //   deleteById() {}
}

export default VotersRepo
