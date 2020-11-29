"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResults = exports.countVotes = exports.fetchResults = exports.findCandidates = exports.findElection = void 0;
const Database_1 = __importDefault(require("../../database/Database"));
const axios_1 = __importDefault(require("axios"));
async function findElection(req, res, next) {
    try {
        const { electionName } = req.body;
        const db = Database_1.default.getInstance().getDatabase();
        const election = await db.election.findOne({
            where: {
                election_name: electionName
            }
        });
        if (election.is_published === true) {
            res.status(406).send();
        }
        else {
            req.body.electionId = election.id;
            req.body.serverUrl = election.server_url;
            next();
        }
    }
    catch (error) {
        res.send(400).send(error);
    }
}
exports.findElection = findElection;
async function findCandidates(req, res, next) {
    try {
        const { electionId } = req.body;
        const db = Database_1.default.getInstance().getDatabase();
        const candidates = await db.candidate.findMany({
            where: {
                election_id: electionId
            },
            select: {
                id: true,
                candidate_name: true
            }
        });
        if (candidates.length > 0) {
            req.body.candidates = candidates;
            next();
        }
        else {
            res.status(406).send();
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
}
exports.findCandidates = findCandidates;
async function fetchResults(req, res, next) {
    try {
        const db = Database_1.default.getInstance().getDatabase();
        const { electionId, serverUrl, candidates } = req.body;
        const scores = await axios_1.default.get(`${serverUrl}/score`);
        if (scores.data.length > 0) {
            const scoresArray = scores.data;
            // temp remove empty element
            scoresArray.shift();
            req.body.scores = scoresArray;
            next();
        }
        else {
            res.status(406).send();
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
}
exports.fetchResults = fetchResults;
async function countVotes(req, res, next) {
    try {
        const db = Database_1.default.getInstance().getDatabase();
        const { electionId, serverUrl, candidates, scores } = req.body;
        for (const candidate of candidates) {
            const matchingRows = scores.filter((item) => {
                if (item === candidate.candidate_name) {
                    return -1;
                }
            });
            const votesCount = matchingRows.length;
            await db.candidate.update({
                where: { id: candidate.id },
                data: {
                    votes: votesCount
                }
            });
        }
        await setResultsAsPublished(electionId);
        res.send();
    }
    catch (error) {
        res.status(400).send(error);
    }
}
exports.countVotes = countVotes;
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