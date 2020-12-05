"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../../database/Database"));
class VoterRepository {
    constructor() {
        this.db = Database_1.default.getInstance().getDatabase();
    }
    async findAll() {
        return await this.db.voter.findMany();
    }
    async findById(id) {
        return await this.db.voter.findOne({
            where: {
                id: id
            }
        });
    }
    async findByUsername(username) {
        return await this.db.voter.findOne({
            where: { username: username }
        });
    }
    async save(voter) {
        return await this.db.voter.create({ data: voter });
    }
}
exports.default = VoterRepository;
//# sourceMappingURL=VoterRepository.js.map