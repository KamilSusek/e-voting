"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../../database/Database"));
const moment_1 = __importDefault(require("moment"));
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
        array.forEach(item => {
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
                }
            }
        });
        const elections = [];
        electionsIds.forEach(item => {
            const { election_name, election_description, start_date, end_date, server_url } = item.Election;
            const now = moment_1.default();
            const end = moment_1.default(end_date);
            elections.push({
                election_name,
                election_description,
                start_date,
                end_date,
                server_url,
                isTimeElaspsed: end < now ? true : false
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
                const response = await db.user_Election.create({
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
                return response;
            }
            else {
                throw new Error();
            }
        }
        catch (error) {
            throw new Error();
        }
    }
    async save(election) {
        try {
            const db = Database_1.default.getInstance().getDatabase();
            const response = await db.election.create({ data: election });
            return response;
        }
        catch (error) {
            throw new Error();
        }
    }
}
exports.default = ElectionsRepo;
//# sourceMappingURL=ElectionsRepo.js.map