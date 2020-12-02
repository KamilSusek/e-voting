import { Response, Request } from 'express'
import ScoreService from '../model/service/ScoreService'

const scoreService = new ScoreService()

export function getScore (req: Request, res: Response) {
  const scores = scoreService.getScore()

  res.send(scores)
}
