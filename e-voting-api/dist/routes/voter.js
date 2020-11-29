"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const score_1 = require("../model/middleware/results/score");
const sendVote_1 = require("../model/middleware/vote/sendVote");
const saveVoter_1 = require("../model/middleware/voter/saveVoter");
const voters_1 = require("../model/middleware/voter/voters");
const voters_2 = require("../model/middleware/voter/voters");
const voters_3 = require("../model/middleware/voter/voters");
const voters_4 = require("../model/middleware/voter/voters");
const countVotes_1 = require("../model/middleware/candidates/countVotes");
const router = express_1.default.Router();
router.post('/login', voters_4.login);
router.get('/voters', voters_3.findAllVoters);
router.get('/voters/:electionName', voters_2.findVoterAttachedToElection);
router.get('/voter/:username', voters_1.findVoterFromParams);
router.get('/voting/result/:electionName', countVotes_1.countVotes);
router.post('/voter', saveVoter_1.saveVoter);
router.post('/send-vote', sendVote_1.validate, sendVote_1.registerVote, sendVote_1.sendVote);
router.get('/score/:electionName', score_1.findElectionFromParams, score_1.prepareScores, score_1.calculateScore);
exports.default = router;
//# sourceMappingURL=voter.js.map