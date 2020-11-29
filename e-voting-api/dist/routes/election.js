"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createElection_1 = require("../middleware/elections/createElection");
const editElections_1 = require("../middleware/elections/editElections");
const findElections_1 = require("../middleware/elections/findElections");
const results_1 = require("../middleware/results/results");
const router = express_1.default.Router();
router.get('/elections', findElections_1.getAllElections);
router.get('/elections/:voterName', findElections_1.getEllectionsByVoter);
router.get('/election/:electionName', findElections_1.getEllectionByName);
router.get('/serverUrl', findElections_1.getEllectionByServerUrl);
router.post('/election', createElection_1.validate, createElection_1.createElection, createElection_1.createCandidates, createElection_1.attachVotersToElection);
router.post('/election/set_user', editElections_1.attachVoterToElections);
router.post('/election/publish', results_1.findElection, results_1.findCandidates, results_1.fetchResults, results_1.countVotes);
router.post('/changeUrl', editElections_1.setServerUrl);
router.delete('/election', editElections_1.deleteElection);
router.get('/results/:electionName', results_1.getResults);
exports.default = router;
//# sourceMappingURL=election.js.map