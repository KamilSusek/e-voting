"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class Database {
    constructor() {
        this.db = new client_1.PrismaClient();
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    getDatabase() {
        return this.db;
    }
}
exports.default = Database;
//# sourceMappingURL=Database.js.map