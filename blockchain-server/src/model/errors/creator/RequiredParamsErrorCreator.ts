import ErrorCreator from './ErrorCreator'
import IHttpError from '../product/IHttpError'
import RequiredParamsError from '../product/RequiredParamsError'

export default class RequiredParamsErrorCreator extends ErrorCreator {
  public factoryMethod (): IHttpError {
    return new RequiredParamsError()
  }
}
