import IHttpError from '../product/IHttpError'
import RequiredBodyNotFoundError from '../product/RequiredBodyNotFoundError'
import ErrorCreator from './ErrorCreator'

export default class RequiredBodyNotFoundErrorCreator extends ErrorCreator {
  public factoryMethod (): IHttpError {
    return new RequiredBodyNotFoundError()
  }
}
