"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const findCandidates_1 = require("../middleware/candidates/findCandidates");
const router = express_1.default.Router();
router.get('/candidates', findCandidates_1.getAllCandidates);
router.get('/candidates/:electionName', findCandidates_1.getCandidateElection);
// router.post('/candidate/set_election')
exports.default = router;
//# sourceMappingURL=candidate.js.map