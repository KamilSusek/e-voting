"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResults = exports.publishElectionResult = void 0;
const Database_1 = __importDefault(require("../../database/Database"));
const axios_1 = __importDefault(require("axios"));
async function publishElectionResult(req, res, next) {
    try {
        const { electionName } = req.body;
        const db = Database_1.default.getInstance().getDatabase();
        const election = await db.election.findOne({
            where: {
                election_name: electionName
            }
        });
        const candidates = await db.candidate.findMany({
            where: {
                election_id: election.id
            },
            select: {
                id: true,
                candidate_name: true
            }
        });
        const scores = await axios_1.default.get(`${election.server_url}/score`);
        const scoresArray = scores.data;
        // temp remove empty element
        scoresArray.shift();
        console.log(scoresArray, candidates);
        for (const candidate of candidates) {
            const matchingRows = scoresArray.filter(item => {
                if (item === candidate.candidate_name) {
                    return -1;
                }
            });
            console.log(matchingRows.length);
            await db.candidate.update({
                where: { id: candidate.id },
                data: {
                    votes: matchingRows.length
                }
            });
        }
        await setResultsAsPublished(election.id);
        res.send();
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
exports.publishElectionResult = publishElectionResult;
async function getResults(req, res, next) {
    try {
        const { electionName } = req.params;
        const db = Database_1.default.getInstance().getDatabase();
        const election = await db.election.findOne({
            where: {
                election_name: electionName
            }
        });
        if (election) {
            const candidates = await db.candidate.findMany({
                where: {
                    election_id: election.id
                },
                select: {
                    candidate_name: true,
                    votes: true
                }
            });
            res.send(candidates);
        }
        else {
            res.status(404).send();
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
}
exports.getResults = getResults;
async function setResultsAsPublished(id) {
    const db = Database_1.default.getInstance().getDatabase();
    await db.election.update({
        where: { id },
        data: {
            is_published: true
        }
    });
}
//# sourceMappingURL=results.js.map