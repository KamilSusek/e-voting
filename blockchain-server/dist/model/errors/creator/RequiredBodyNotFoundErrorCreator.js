"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequiredBodyNotFoundError_1 = __importDefault(require("../product/RequiredBodyNotFoundError"));
const ErrorCreator_1 = __importDefault(require("./ErrorCreator"));
class RequiredBodyNotFoundErrorCreator extends ErrorCreator_1.default {
    factoryMethod() {
        return new RequiredBodyNotFoundError_1.default();
    }
}
exports.default = RequiredBodyNotFoundErrorCreator;
//# sourceMappingURL=RequiredBodyNotFoundErrorCreator.js.map