import Database from '../../database/Database'
import moment from 'moment'

class VoteRepo {
  async registerVote (
    username: string,
    electionName: string
  ): Promise<boolean> {
    const db = Database.getInstance().getDatabase()

    const voter = await db.voter.findOne({
      where: {
        username
      }
    })

    const election = await db.election.findOne({
      where: {
        election_name: electionName
      }
    })

    const votersWithElections = await db.user_Election.findMany()
    const matchingRow = votersWithElections.find(item => {
      if (item.election_id === election.id && item.voter_id === voter.id)
        return item
    })

    console.log(matchingRow)

    // Alredy voted
    if (matchingRow.didVote) {
      return false
    } else {
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
