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
const auth_1 = require("./auth");
const router = express_1.default.Router();
router.get('/elections', auth_1.ensureToken, auth_1.verifyToken, findElections_1.getAllElections);
router.get('/elections/:voterName', auth_1.ensureToken, auth_1.verifyToken, findElections_1.getEllectionsByVoter);
router.get('/election/:electionName', auth_1.ensureToken, auth_1.verifyToken, auth_1.ensureAdmin, findElections_1.getEllectionByName);
router.get('/serverUrl', auth_1.ensureToken, auth_1.verifyToken, auth_1.ensureAdmin, findElections_1.getEllectionByServerUrl);
router.post('/election', auth_1.ensureToken, auth_1.verifyToken, auth_1.ensureAdmin, createElection_1.validate, createElection_1.createElection, createElection_1.createCandidates, createElection_1.attachVotersToElection);
router.post('/election/set_user', auth_1.ensureToken, auth_1.verifyToken, auth_1.ensureAdmin, editElections_1.attachVoterToElections);
router.post('/election/publish', auth_1.ensureToken, auth_1.verifyToken, auth_1.ensureAdmin, results_1.findElection, results_1.findCandidates, results_1.fetchResults, results_1.countVotes);
router.post('/changeUrl', auth_1.ensureToken, auth_1.verifyToken, auth_1.ensureAdmin, editElections_1.setServerUrl);
router.delete('/election', auth_1.ensureToken, auth_1.verifyToken, auth_1.ensureAdmin, editElections_1.deleteElection);
router.get('/results/:electionName', auth_1.ensureToken, auth_1.verifyToken, results_1.getResults);
exports.default = router;
//# sourceMappingURL=election.js.map