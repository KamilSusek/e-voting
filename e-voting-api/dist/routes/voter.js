"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const score_1 = require("../services/vote/score");
const sendVote_1 = require("../services/vote/sendVote");
const saveVoter_1 = require("../services/vote/saveVoter");
const voters_1 = require("../services/vote/voters");
const voters_2 = require("../services/vote/voters");
const voters_3 = require("../services/vote/voters");
const voters_4 = require("../services/vote/voters");
const router = express_1.default.Router();
router.post('/login', voters_4.login);
router.get('/voters', voters_3.findAllVoters);
router.get('/voters/:electionName', voters_2.findVoterAttachedToElection);
router.get('/voter/:username', voters_1.findVoterFromParams);
router.post('/voter', saveVoter_1.saveVoter);
router.post('/send-vote', sendVote_1.registerVote, sendVote_1.sendVote);
router.get('/score/:electionName', score_1.findElectionFromParams, score_1.prepareScores, score_1.calculateScore);
exports.default = router;
//# sourceMappingURL=voter.js.map