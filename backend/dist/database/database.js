"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const DBSOURCE = "db.sqlite";
exports.db = new sqlite3_1.default.Database(DBSOURCE, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("connected to db");
    }
});
//# sourceMappingURL=database.js.map