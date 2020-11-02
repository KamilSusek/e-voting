import Database from "../../database/Database";

interface VoterDTO {
  password: string;
  username: string;
}

class VotersRepo {
  async findAll(): Promise<VoterDTO[]> {
    const db = Database.getInstance().getDatabase();

    const array = await db.voter.findMany({
      select: { username: true, password: true },
    });
    return array;
  }

  async findByUsername(username: string): Promise<VoterDTO> {
    const db = Database.getInstance().getDatabase();
    const value = await db.voter.findOne({
      where: {
        username,
      },
    });

    return value;
  }

  //   async findElectionsByUser(){}

  //   findById() {}

  async save(voter: VoterDTO) {
    const db = Database.getInstance().getDatabase();

    const response = await db.voter.create({ data: voter });

    return response;
  }

  //   deleteById() {}
}

export default VotersRepo;
