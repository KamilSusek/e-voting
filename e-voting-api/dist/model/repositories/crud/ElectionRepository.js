"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../../database/Database"));
class ElectionRepository {
    constructor() {
        this.db = Database_1.default.getInstance().getDatabase();
    }
    async findAll() {
        return await this.db.election.findMany();
    }
    async findById(id) {
        return await this.db.election.findOne({
            where: {
                id: id
            }
        });
    }
    async findByElectionName(electionName) {
        return await this.db.election.findOne({
            where: {
                election_name: electionName
            }
        });
    }
    async save(election) {
        return await this.db.election.create({ data: election });
    }
}
exports.default = ElectionRepository;
//# sourceMappingURL=ElectionRepository.js.map