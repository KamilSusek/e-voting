"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateScore = exports.prepareScores = exports.findElectionFromParams = void 0;
const CandidatesRepo_1 = __importDefault(require("../../repository/implementation/CandidatesRepo"));
const ElectionsRepo_1 = __importDefault(require("../../repository/implementation/ElectionsRepo"));
const VotersRepo_1 = __importDefault(require("../../repository/implementation/VotersRepo"));
const axios_1 = __importDefault(require("axios"));
const electionsRepository = new ElectionsRepo_1.default();
const candidatesRepo = new CandidatesRepo_1.default();
const voters = new VotersRepo_1.default();
async function findElectionFromParams(req, res, next) {
    try {
        const { electionName } = req.params;
        const election = await electionsRepository.findByElectionName(electionName);
        if (election) {
            req.body.electionName = electionName;
            req.body.election = election;
            next();
        }
        else {
            res.status(401).send();
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.findElectionFromParams = findElectionFromParams;
async function prepareScores(req, res, next) {
    const { election, electionName } = req.body;
    const response = await axios_1.default.get(`${election.server_url}/score`);
    const candidates = await candidatesRepo.findCandidatesByElectionName(electionName);
    if (response.data && candidates) {
        req.body.scores = response.data;
        req.body.candidates = candidates;
        next();
    }
    else {
        res.status(401).send();
    }
}
exports.prepareScores = prepareScores;
async function calculateScore(req, res, next) {
    const { scores, candidates } = req.body;
    const scoresArray = scores;
    const countedVotes = new Array();
    candidates.forEach(({ candidate_name }) => {
        const matchingVotes = scoresArray.filter((item) => item === candidate_name);
        const voteCounter = matchingVotes.length;
        countedVotes.push({ candidate_name, voteCounter });
    });
    console.log(countedVotes);
    res.status(200).send(countedVotes);
}
exports.calculateScore = calculateScore;
//# sourceMappingURL=score.js.map