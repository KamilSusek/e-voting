"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../Database"));
class ElectionsRepository {
    constructor() {
        console.log("Elections repo.");
    }
    onCreateTable() {
        const database = Database_1.default.getInstance().getDatabase();
        database.serialize(() => {
            database.run(`CREATE TABLE elections(
              id BIGINT PRIMARY KEY,
              elections_name TEXT,
              elections_description TEXT,
              start_date TEXT,
              end_date TEXT
           );`);
        });
    }
    onFindAll() {
        throw new Error("Method not implemented.");
    }
    onFindById(id) {
        throw new Error("Method not implemented.");
    }
    onSave(entity) {
        throw new Error("Method not implemented.");
    }
    onDeleteById(id) {
        throw new Error("Method not implemented.");
    }
}
exports.default = ElectionsRepository;
//# sourceMappingURL=ElectionsRepository.js.map