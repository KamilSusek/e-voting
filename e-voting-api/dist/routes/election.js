"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ElectionsRepo_1 = __importDefault(require("../repository/implementation/ElectionsRepo"));
const createElection_1 = require("./middleware/createElection");
const findElections_1 = require("./middleware/findElections");
const router = express_1.default.Router();
const elections = new ElectionsRepo_1.default();
router.get('/elections', findElections_1.getAllElections);
router.post('/election/publish', elections.publishElectionResult);
router.get('/elections/:voterName', findElections_1.getEllectionsByVoter);
router.get('/election/:electionName', findElections_1.getEllectionByName);
router.post('/election', createElection_1.validate, createElection_1.createElection, createElection_1.createCandidates, createElection_1.attachVotersToElection);
router.post('/election/set_user', async (req, res) => {
    try {
        const { voterName, electionName } = req.body;
        const response = await elections.setElectionToVoter(voterName, electionName);
        res.send(response);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});
exports.default = router;
//# sourceMappingURL=election.js.map