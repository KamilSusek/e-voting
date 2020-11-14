"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CandidatesRepo_1 = __importDefault(require("../repository/implementation/CandidatesRepo"));
const router = express_1.default.Router();
const candidates = new CandidatesRepo_1.default();
router.get('/candidates', async (req, res) => {
    try {
        const response = await candidates.findAll();
        res.send(response);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
router.get('/candidates/:electionName', async (req, res) => {
    try {
        const { electionName } = req.params;
        const response = await candidates.findCandidatesByElectionName(electionName);
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});
router.post('/candidate/set_election', async (req, res) => {
    try {
        const { candidate_name, candidate_description, electionName } = req.body;
        const response = await candidates.saveCandidateToElection({ candidate_name, candidate_description }, electionName);
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});
exports.default = router;
//# sourceMappingURL=candidate.js.map