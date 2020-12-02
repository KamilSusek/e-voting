"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const score_1 = require("../middleware/score");
const score = express_1.default.Router();
score.get('/score', score_1.getScore);
exports.default = score;
//# sourceMappingURL=score.js.map