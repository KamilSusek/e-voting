import ErrorContent from '../ErrorContent'
import IHttpError from './IHttpError'

export default class RequiredBodyNotFoundError implements IHttpError {
  private readonly statusCode = 400
  private readonly errorMessage = 'Required params not found.'

  getError (): ErrorContent {
    throw new ErrorContent(this.statusCode, this.errorMessage)
  }
}
