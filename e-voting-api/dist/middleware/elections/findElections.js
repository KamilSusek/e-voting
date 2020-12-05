"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEllectionsByVoter = exports.getEllectionByServerUrl = exports.getEllectionByName = exports.getAllElections = void 0;
const Database_1 = __importDefault(require("../../model/database/Database"));
const moment_1 = __importDefault(require("moment"));
async function getAllElections(req, res, next) {
    try {
        const db = Database_1.default.getInstance().getDatabase();
        const elections = await db.election.findMany({
            select: {
                election_name: true,
                election_description: true,
                start_date: true,
                end_date: true,
                server_url: true,
                is_published: true
            }
        });
        res.send(elections);
    }
    catch (error) {
        res.status(400).send();
    }
}
exports.getAllElections = getAllElections;
async function getEllectionByName(req, res, next) {
    try {
        const { electionName } = req.params;
        const db = Database_1.default.getInstance().getDatabase();
        const election = await db.election.findOne({
            where: {
                election_name: electionName
            },
            select: {
                election_name: true,
                election_description: true,
                start_date: true,
                end_date: true,
                server_url: true,
                is_published: true
            }
        });
        res.send(election);
    }
    catch (error) {
        res.status(400).send();
    }
}
exports.getEllectionByName = getEllectionByName;
async function getEllectionByServerUrl(req, res, next) {
    try {
        const { serverUrl } = req.query;
        const db = Database_1.default.getInstance().getDatabase();
        const elections = await db.election.findOne({
            where: {
                server_url: serverUrl.toString()
            },
            select: {
                election_name: true,
                election_description: true,
                start_date: true,
                end_date: true,
                server_url: true,
                is_published: true
            }
        });
        res.send(elections);
    }
    catch (error) {
        res.status(400).send();
    }
}
exports.getEllectionByServerUrl = getEllectionByServerUrl;
async function getEllectionsByVoter(req, res, next) {
    try {
        const { voterName } = req.params;
        const db = Database_1.default.getInstance().getDatabase();
        const elections = await db.user_Election.findMany({
            where: {
                Voter: {
                    username: voterName
                }
            },
            select: {
                Election: {
                    select: {
                        election_name: true,
                        election_description: true,
                        start_date: true,
                        end_date: true,
                        server_url: true,
                        is_published: true
                    }
                },
                didVote: true
            }
        });
        const responseData = transformToElectionsDTO(elections);
        console.log(responseData);
        res.send(responseData);
    }
    catch (error) {
        res.status(400).send();
    }
}
exports.getEllectionsByVoter = getEllectionsByVoter;
function transformToElectionsDTO(elections) {
    const retArray = [];
    elections.forEach(item => {
        const { election_name, election_description, start_date, end_date, server_url, is_published } = item.Election;
        const didVote = item.didVote;
        const now = moment_1.default();
        const end = moment_1.default(end_date);
        retArray.push({
            election_name,
            election_description,
            start_date,
            end_date,
            server_url,
            is_published,
            isTimeElaspsed: end < now ? true : false,
            didVote
        });
    });
    return retArray;
}
//# sourceMappingURL=findElections.js.map