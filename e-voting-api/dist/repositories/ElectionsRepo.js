"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../database/Database"));
const moment_1 = __importDefault(require("moment"));
const axios_1 = __importDefault(require("axios"));
class ElectionsRepo {
    async findAll() {
        const db = Database_1.default.getInstance().getDatabase();
        const array = await db.election.findMany({
            select: {
                election_name: true,
                election_description: true,
                start_date: true,
                end_date: true
            }
        });
        const retVal = new Array();
        array.forEach((item) => {
            const now = moment_1.default();
            const endDate = moment_1.default(item.end_date);
            const electionDTO = Object.assign(Object.assign({}, item), { isTimeElaspsed: endDate < now });
            retVal.push(electionDTO);
        });
        return retVal;
    }
    async findByElectionName(electionName) {
        const db = Database_1.default.getInstance().getDatabase();
        const value = await db.election.findOne({
            where: {
                election_name: electionName
            }
        });
        return value;
    }
    async findElectionsForVoter(voterName) {
        const db = Database_1.default.getInstance().getDatabase();
        const voter = await db.voter.findOne({
            where: {
                username: voterName
            }
        });
        const electionsIds = await db.user_Election.findMany({
            where: {
                voter_id: voter.id
            },
            select: {
                Election: {
                    select: {
                        election_name: true,
                        election_description: true,
                        start_date: true,
                        end_date: true,
                        server_url: true
                    }
                },
                didVote: true
            }
        });
        const elections = [];
        electionsIds.forEach(item => {
            const { election_name, election_description, start_date, end_date, server_url } = item.Election;
            const didVote = item.didVote;
            const now = moment_1.default();
            const end = moment_1.default(end_date);
            elections.push({
                election_name,
                election_description,
                start_date,
                end_date,
                server_url,
                isTimeElaspsed: end < now ? true : false,
                didVote
            });
        });
        return elections;
    }
    async setElectionToVoter(voterName, electionName) {
        try {
            const db = Database_1.default.getInstance().getDatabase();
            const voter = await db.voter.findOne({
                where: {
                    username: voterName
                }
            });
            const election = await db.election.findOne({
                where: {
                    election_name: electionName
                }
            });
            if (voter && election) {
                const resp = await db.user_Election.create({
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
                return resp;
            }
            else {
                throw new Error();
            }
        }
        catch (error) {
            console.log(error);
            throw new Error();
        }
    }
    async findIfUserDidVote(votername) {
        const db = Database_1.default.getInstance().getDatabase();
        db.voter
            .findOne({
            where: {
                username: votername
            }
        })
            .then(voter => {
            db.user_Election
                .findOne({
                where: {
                    id: voter.id
                }
            })
                .then(userElection => {
                console.log(userElection);
            })
                .catch(err => {
                console.log(err);
            });
        })
            .catch(err => {
            console.log(err);
        });
    }
    async findVoterElection() {
        try {
            const db = Database_1.default.getInstance().getDatabase();
            const results = await db.user_Election.findMany();
            console.log(results);
        }
        catch (error) {
            console.log(error);
        }
    }
    async publishElectionResult(req, res, next) {
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
            scoresArray.shift();
            console.log(scores.data);
            res.send(scores.data);
        }
        catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    async save(election) {
        try {
            const db = Database_1.default.getInstance().getDatabase();
            const res = await db.election.create({ data: election });
            return res;
        }
        catch (error) {
            throw new Error();
        }
    }
}
exports.default = ElectionsRepo;
//# sourceMappingURL=ElectionsRepo.js.map