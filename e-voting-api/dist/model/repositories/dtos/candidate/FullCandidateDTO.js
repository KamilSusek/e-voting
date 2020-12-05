"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCandidateDTO_1 = __importDefault(require("./BaseCandidateDTO"));
class FullCandidateDTO extends BaseCandidateDTO_1.default {
}
exports.default = FullCandidateDTO;
FullCandidateDTO.dto = {
    id: true,
    candidate_name: true,
    candidate_description: true
};
//# sourceMappingURL=FullCandidateDTO.js.map