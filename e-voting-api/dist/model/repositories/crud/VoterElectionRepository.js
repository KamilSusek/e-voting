"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../../database/Database"));
class VoterElectionRepository {
    constructor() {
        this.db = Database_1.default.getInstance().getDatabase();
    }
    async findAll() {
        return this.db.user_Election.findMany();
    }
    async findById(id) {
        return this.db.user_Election.findMany({
            where: {
                id: id
            }
        });
    }
    async findManyByElectionId(id) {
        return await this.db.user_Election.findMany({
            where: {
                election_id: id
            },
            select: {
                Voter: {
                    select: {
                        username: true
                    }
                }
            }
        });
    }
    async save(entity) {
        return this.db.user_Election.create({
            data: {
                Election: {
                    connect: {
                        id: entity.election_id
                    }
                },
                Voter: {
                    connect: {
                        id: entity.voter_id
                    }
                }
            }
        });
    }
}
exports.default = VoterElectionRepository;
//# sourceMappingURL=VoterElectionRepository.js.map