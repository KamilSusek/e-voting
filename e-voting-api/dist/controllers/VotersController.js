"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VotersService_1 = __importDefault(require("../services/VotersService"));
class VotersController {
    constructor() {
        this.votersService = new VotersService_1.default();
    }
}
//# sourceMappingURL=VotersController.js.map