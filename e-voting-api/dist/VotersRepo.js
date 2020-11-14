"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("./Database"));
class VotersRepo {
    async findAll() {
        const db = Database_1.default.getInstance().getDatabase();
        const array = await db.voter.findMany({
            select: { username: true, password: true },
        });
        return array;
    }
    async findByUsername(username) {
        const db = Database_1.default.getInstance().getDatabase();
        const value = await db.voter.findOne({
            where: {
                username,
            },
        });
        return value;
    }
    //   async findElectionsByUser(){}
    //   findById() {}
    async save(voter) {
        const db = Database_1.default.getInstance().getDatabase();
        const response = await db.voter.create({ data: voter });
        return response;
    }
}
exports.default = VotersRepo;
//# sourceMappingURL=VotersRepo.js.map