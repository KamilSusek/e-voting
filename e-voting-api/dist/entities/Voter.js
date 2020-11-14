"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../Database"));
class VotersRepository {
    constructor() {
        console.log("Voters repo.");
    }
    onCreateTable() {
        const database = Database_1.default.getInstance().getDatabase();
        database.serialize(() => {
            database.run(`CREATE TABLE voters(
              id BIGINT PRIMARY KEY,
              username TEXT,
              password TEXT
           );`);
        });
    }
    onFindAll() {
        let array = null;
        const database = Database_1.default.getInstance().getDatabase();
        database.all("SELECT * FROM voters;", (err, rows) => {
            if (err) {
                return null;
            }
            else {
                array = rows;
                return rows;
            }
        });
        return array;
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
exports.default = VotersRepository;
//# sourceMappingURL=Voter.js.map