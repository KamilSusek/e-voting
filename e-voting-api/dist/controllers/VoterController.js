"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const VotersRepo_1 = __importDefault(require("../repositories/VotersRepo"));
const ElectionsRepo_1 = __importDefault(require("../repositories/ElectionsRepo"));
const Database_1 = __importDefault(require("../database/Database"));
class VoterController {
    constructor() {
        this.votersRepo = new VotersRepo_1.default();
        this.electionsRepo = new ElectionsRepo_1.default();
    }
    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const response = await this.votersRepo.findByUsername(username);
            if (response.password === password) {
                res.send();
            }
            else {
                res.status(403).send();
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    async findAllVoters(req, res, next) {
        try {
            const response = await this.votersRepo.findAll();
            res.status(200).send(response);
        }
        catch (error) {
            console.log(error);
            res.status(404).send(error);
        }
    }
    async findVoterFromParams(req, res, next) {
        try {
            const { username } = req.params;
            const response = await this.votersRepo.findByUsername(username);
            res.send(response);
        }
        catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    async findVoterAttachedToElection(req, res, next) {
        try {
            const { electionName } = req.params;
            const response = await this.votersRepo.findVoterByElection(electionName);
            res.send(response);
        }
        catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    async saveVoter(req, res, next) {
        try {
            const { username, password } = req.body;
            const response = await this.votersRepo.save({ username, password });
            res.status(201).send();
        }
        catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    async validate(req, res, next) {
        try {
            const { username, electionName } = req.body;
            if (username && electionName) {
                next();
            }
            else {
                res.status(406).send();
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async registerVote(req, res, next) {
        try {
            const { username, electionName } = req.body;
            const db = Database_1.default.getInstance().getDatabase();
            const voter = await db.voter.findOne({
                where: {
                    username
                }
            });
            const election = await db.election.findOne({
                where: {
                    election_name: electionName
                }
            });
            const votersWithElections = await db.user_Election.findMany();
            const matchingRow = votersWithElections.find((item) => {
                if (item.election_id === election.id && item.voter_id === voter.id)
                    return item;
            });
            console.log(matchingRow);
            // Alredy voted
            if (matchingRow.didVote) {
                res.status(403).send();
            }
            else {
                await db.user_Election.update({
                    where: {
                        id: matchingRow.id
                    },
                    data: {
                        didVote: true
                    }
                });
                next();
            }
        }
        catch (error) {
            res.status(406).send();
        }
    }
    async sendVote(req, res, next) {
        const { electionName, vote } = req.body;
        const election = await this.electionsRepo.findByElectionName(electionName);
        console.log('election', election, 'vote', vote);
        if (election) {
            axios_1.default.post(`${election.server_url}/distribute`, vote).catch(error => {
                res.status(400).send();
            });
        }
        res.status(200).send();
    }
}
exports.default = VoterController;
//# sourceMappingURL=VoterController.js.map