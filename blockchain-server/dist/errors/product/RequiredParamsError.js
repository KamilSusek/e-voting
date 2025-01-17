"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorContent_1 = __importDefault(require("../ErrorContent"));
class RequiredParamsError {
    constructor() {
        this.statusCode = 400;
        this.errorMessage = 'Required params not found.';
    }
    getError() {
        return new ErrorContent_1.default(this.statusCode, this.errorMessage);
    }
}
exports.default = RequiredParamsError;
//# sourceMappingURL=RequiredParamsError.js.map