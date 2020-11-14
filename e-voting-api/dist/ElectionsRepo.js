"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("./Database"));
class ElectionsRepo {
    async findAll() {
        const db = Database_1.default.getInstance().getDatabase();
        const array = await db.election.findMany({
            select: {
                election_name: true,
                election_description: true,
                start_date: true,
                end_date: true,
            },
        });
        return array;
    }
    async findByElectionName(electionName) {
        const db = Database_1.default.getInstance().getDatabase();
        const value = await db.election.findOne({
            where: {
                election_name: electionName,
            },
        });
        return value;
    }
    async setElectionToVoter(voterName, electionName) {
        const db = Database_1.default.getInstance().getDatabase();
        const voter = await db.voter.findOne({
            where: {
                username: voterName,
            },
        });
        const election = await db.election.findOne({
            where: {
                election_name: electionName,
            },
        });
        console.log(voter, election);
        if (voter && election) {
            const { election_name, election_description, start_date, end_date, } = election;
            const { username, password } = voter;
            const response = await db.user_Election.create({
                data: {
                    Election: {
                        connect: {
                            id: election.id,
                        },
                    },
                    Voter: {
                        connect: {
                            id: voter.id,
                        },
                    },
                },
            });
            return response;
        }
        else {
            throw new Error();
        }
    }
    async save(election) {
        const db = Database_1.default.getInstance().getDatabase();
        const response = await db.election.create({ data: election });
        return response;
    }
}
exports.default = ElectionsRepo;
//# sourceMappingURL=ElectionsRepo.js.map