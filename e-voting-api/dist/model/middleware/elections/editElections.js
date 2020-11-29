"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachVoterToElections = exports.setServerUrl = exports.deleteElection = void 0;
const Database_1 = __importDefault(require("../../database/Database"));
async function deleteElection(req, res, next) {
    try {
        const { electionName } = req.body;
        const db = Database_1.default.getInstance().getDatabase();
        const election = await db.election.findOne({
            where: {
                election_name: electionName
            }
        });
        await db.user_Election.deleteMany({
            where: {
                election_id: election.id
            }
        });
        await db.candidate.deleteMany({
            where: {
                election_id: election.id
            }
        });
        await db.election.delete({
            where: {
                id: election.id
            }
        });
        res.send();
    }
    catch (error) {
        res.status(400).send();
    }
}
exports.deleteElection = deleteElection;
async function setServerUrl(req, res, next) {
    try {
        const { electionName, serverUrl } = req.body;
        const db = Database_1.default.getInstance().getDatabase();
        const election = await db.election.update({
            where: {
                election_name: electionName
            },
            data: {
                server_url: serverUrl
            }
        });
        console.log(election);
        res.send();
    }
    catch (error) {
        console.log(error);
        res.status(400).send();
    }
}
exports.setServerUrl = setServerUrl;
async function attachVoterToElections(req, res, next) {
    try {
        const { voterName, electionName } = req.body;
        const db = Database_1.default.getInstance().getDatabase();
        const election = await db.election.findOne({
            where: {
                election_name: electionName
            }
        });
        const voter = await db.voter.findOne({
            where: {
                username: voterName
            }
        });
        if (election && voter) {
            db.user_Election.create({
                data: {
                    Election: {
                        connect: {
                            id: election.id
                        }
                    },
                    Voter: {
                        connect: {
                            id: voter.id
                        }
                    }
                }
            });
            res.send();
        }
        else {
            res.status(406).send();
        }
    }
    catch (error) {
        res.status(400).send();
    }
}
exports.attachVoterToElections = attachVoterToElections;
//# sourceMappingURL=editElections.js.map