import IElectionDTO from './IElectionDTO'

export default class BaseElectionDTO {
  public static readonly dto: IElectionDTO = {
    id: true,
    election_name: true,
    election_description: true,
    date_from: true,
    date_to: true
  }
}
