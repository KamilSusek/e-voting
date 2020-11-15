"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachVotersToElection = exports.createCandidates = exports.createElection = exports.validate = void 0;
const Database_1 = __importDefault(require("../../database/Database"));
async function validate(req, res, next) {
    const { election, candidates, voters } = req.body;
    if (election && candidates && voters) {
        next();
    }
    else {
        res.status(406).send();
    }
}
exports.validate = validate;
async function createElection(req, res, next) {
    try {
        const { election } = req.body;
        const db = Database_1.default.getInstance().getDatabase();
        const response = await db.election.create({ data: election });
        req.body.electionId = response.id;
        next();
    }
    catch (error) {
        res.status(400).send();
        console.log(error);
    }
}
exports.createElection = createElection;
async function createCandidates(req, res, next) {
    try {
        const { candidates, electionId } = req.body;
        const db = Database_1.default.getInstance().getDatabase();
        for (const item of candidates) {
            await db.candidate.create({
                data: {
                    candidate_name: item.candidate_name,
                    candidate_description: item.candidate_description,
                    Election: {
                        connect: {
                            id: electionId
                        }
                    }
                }
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(400).send();
    }
}
exports.createCandidates = createCandidates;
async function attachVotersToElection(req, res, next) {
    try {
        const { voters, electionId } = req.body;
        const db = Database_1.default.getInstance().getDatabase();
        for (const item of voters) {
            const voter = await db.voter.findOne({
                where: {
                    username: item.username
                }
            });
            await db.user_Election.create({
                data: {
                    Election: {
                        connect: {
                            id: electionId
                        }
                    },
                    Voter: {
                        connect: {
                            id: voter.id
                        }
                    }
                }
            });
        }
        res.status(201).send();
    }
    catch (error) {
        console.log(error);
        res.status(400).send();
    }
}
exports.attachVotersToElection = attachVotersToElection;
//# sourceMappingURL=createElection.js.map