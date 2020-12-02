import ErrorContent from '../ErrorContent'
import IHttpError from '../product/IHttpError'

export default abstract class ErrorCreator {
  public abstract factoryMethod (): IHttpError
}
