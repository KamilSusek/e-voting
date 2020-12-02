import ErrorContent from '../ErrorContent'
import IHttpError from './IHttpError'

export default class RequiredParamsError implements IHttpError {
  private readonly statusCode = 400
  private readonly errorMessage = 'Required params not found.'

  getError (): ErrorContent {
    return new ErrorContent(this.statusCode, this.errorMessage)
  }
}
