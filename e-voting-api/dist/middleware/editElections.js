"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachVoterToElections = void 0;
const Database_1 = __importDefault(require("../database/Database"));
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