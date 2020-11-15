"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveVoter = void 0;
const VotersRepo_1 = __importDefault(require("../../repositories/VotersRepo"));
const votersRepo = new VotersRepo_1.default();
async function saveVoter(req, res, next) {
    try {
        const { username, password } = req.body;
        const response = await votersRepo.save({ username, password });
        res.status(201).send();
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
exports.saveVoter = saveVoter;
//# sourceMappingURL=saveVoter.js.map