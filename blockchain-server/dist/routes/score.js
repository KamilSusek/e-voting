"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ScoreController_1 = require("../middleware/ScoreController");
const score = express_1.default.Router();
score.get('/score', ScoreController_1.getScore);
exports.default = score;
//# sourceMappingURL=score.js.map