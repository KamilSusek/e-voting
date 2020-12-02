import ErrorContent from '../ErrorContent'

export default interface IHttpError {
  getError(): ErrorContent
}
