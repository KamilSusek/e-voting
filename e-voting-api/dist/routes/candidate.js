"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const findCandidates_1 = require("../middleware/candidates/findCandidates");
const auth_1 = require("./auth");
const router = express_1.default.Router();
router.get('/candidates', auth_1.ensureToken, auth_1.verifyToken, auth_1.ensureAdmin, findCandidates_1.getAllCandidates);
router.get('/candidates/:electionName', auth_1.ensureToken, auth_1.verifyToken, findCandidates_1.getCandidateElection);
exports.default = router;
//# sourceMappingURL=candidate.js.map