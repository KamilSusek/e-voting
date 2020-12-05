import ICandidateDTO from './ICandidateDTO'

export default class BaseCandidateDTO {
  public static readonly dto: ICandidateDTO = {
    id: false,
    candidate_name: true,
    candidate_description: true
  }
}
