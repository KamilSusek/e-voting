"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCreator_1 = __importDefault(require("./ErrorCreator"));
const RequiredParamsError_1 = __importDefault(require("../product/RequiredParamsError"));
class RequiredParamsErrorCreator extends ErrorCreator_1.default {
    factoryMethod() {
        return new RequiredParamsError_1.default();
    }
}
exports.default = RequiredParamsErrorCreator;
//# sourceMappingURL=RequiredParamsErrorCreator.js.map