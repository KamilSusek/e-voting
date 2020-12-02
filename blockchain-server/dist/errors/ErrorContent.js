"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorContent {
    constructor(statusCode, errorMessage) {
        this._statusCode = statusCode;
        this._errorMessage = errorMessage;
    }
    get statusCode() {
        return this._statusCode;
    }
    set statusCode(statusCode) {
        this._statusCode = statusCode;
    }
    get errorMessage() {
        return this._errorMessage;
    }
    set errorMessage(errorMessage) {
        this._errorMessage = errorMessage;
    }
}
exports.default = ErrorContent;
//# sourceMappingURL=ErrorContent.js.map