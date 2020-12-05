"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../../database/Database"));
class AdminRepository {
    constructor() {
        this.db = Database_1.default.getInstance().getDatabase();
    }
    async findAll() {
        return await this.db.aDMIN.findMany();
    }
    async findById(id) {
        return await this.db.aDMIN.findOne({
            where: {
                id: id
            }
        });
    }
    async findByUsername(username) {
        return await this.db.aDMIN.findOne({
            where: {
                username: username
            }
        });
    }
    async save(entity) {
        return this.db.aDMIN.create({
            data: entity
        });
    }
}
exports.default = AdminRepository;
//# sourceMappingURL=AdminRepository.js.map