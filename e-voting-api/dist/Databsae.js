"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
class Database {
    constructor() {
        this.db = new sqlite3_1.default.Database("../db.sqlite", (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Connected to db.");
            }
        });
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
//# sourceMappingURL=Databsae.js.map