"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const score_1 = require("../middleware/results/score");
const sendVote_1 = require("../middleware/vote/sendVote");
const saveVoter_1 = require("../middleware/voter/saveVoter");
const voters_1 = require("../middleware/voter/voters");
const voters_2 = require("../middleware/voter/voters");
const voters_3 = require("../middleware/voter/voters");
const countVotes_1 = require("../middleware/candidates/countVotes");
const auth_1 = require("./auth");
const router = express_1.default.Router();
router.get('/voters', auth_1.ensureToken, auth_1.verifyToken, auth_1.ensureAdmin, voters_3.findAllVoters);
router.get('/voters/:electionName', auth_1.ensureToken, auth_1.verifyToken, auth_1.ensureAdmin, voters_2.findVoterAttachedToElection);
router.get('/voter/:username', auth_1.ensureToken, auth_1.verifyToken, auth_1.ensureAdmin, voters_1.findVoterFromParams);
router.get('/voting/result/:electionName', auth_1.ensureToken, auth_1.verifyToken, countVotes_1.countVotes);
router.post('/voter/add', auth_1.ensureToken, auth_1.verifyToken, auth_1.ensureAdmin, saveVoter_1.saveVoter);
router.post('/send-vote', auth_1.ensureToken, auth_1.verifyToken, auth_1.ensureUser, sendVote_1.validate, sendVote_1.registerVote, sendVote_1.sendVote);
router.get('/score/:electionName', auth_1.ensureToken, auth_1.verifyToken, score_1.findElectionFromParams, score_1.prepareScores, score_1.calculateScore);
exports.default = router;
//# sourceMappingURL=voter.js.map