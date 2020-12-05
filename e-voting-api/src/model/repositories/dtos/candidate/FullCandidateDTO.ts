import BaseCandidateDTO from './BaseCandidateDTO'
import ICandidateDTO from './ICandidateDTO'

export default class FullCandidateDTO extends BaseCandidateDTO {
  public static readonly dto: ICandidateDTO = {
    id: true,
    candidate_name: true,
    candidate_description: true
  }
}
