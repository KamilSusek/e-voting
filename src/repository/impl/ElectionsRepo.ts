import Database from "../../database/Database";
interface ElectionDTO {
  election_name: string;
  election_description: string;
  start_date: string;
  end_date: string;
}

class ElectionsRepo {
  async findAll(): Promise<any[]> {
    const db = Database.getInstance().getDatabase();
    const array = await db.election.findMany({
      select: {
        election_name: true,
        election_description: true,
        start_date: true,
        end_date: true,
      },
    });
    return array;
  }

  async findByElectionName(electionName: string) {
    const db = Database.getInstance().getDatabase();

    const value = await db.election.findOne({
      where: {
        election_name: electionName,
      },
    });

    return value;
  }

  async setElectionToVoter(voterName: string, electionName: string) {
    const db = Database.getInstance().getDatabase();

    const voter = await db.voter.findOne({
      where: {
        username: voterName,
      },
    });

    const election = await db.election.findOne({
      where: {
        election_name: electionName,
      },
    });
    console.log(voter, election);
    if (voter && election) {
      const {
        election_name,
        election_description,
        start_date,
        end_date,
      } = election;

      const { username, password } = voter;

      const response = await db.user_Election.create({
        data: {
          Election: {
            connect: {
              id: election.id,
            },
          },
          Voter: {
            connect: {
              id: voter.id,
            },
          },
        },
      });
      return response;
    } else {
      throw new Error();
    }
  }

  async save(election: ElectionDTO) {
    const db = Database.getInstance().getDatabase();
    const response = await db.election.create({ data: election });

    return response;
  }
}

export default ElectionsRepo;
