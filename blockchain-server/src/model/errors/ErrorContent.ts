export default class ErrorContent {
  private _statusCode: number
  private _errorMessage: string

  constructor (statusCode: number, errorMessage: string) {
    this._statusCode = statusCode
    this._errorMessage = errorMessage
  }

  get statusCode () {
    return this._statusCode
  }

  set statusCode (statusCode: number) {
    this._statusCode = statusCode
  }

  get errorMessage () {
    return this._errorMessage
  }

  set errorMessage (errorMessage: string) {
    this._errorMessage = errorMessage
  }
}
