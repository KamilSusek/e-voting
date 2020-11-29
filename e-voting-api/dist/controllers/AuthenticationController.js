"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sha256_1 = __importDefault(require("crypto-js/sha256"));
const Database_1 = __importDefault(require("../database/Database"));
class AuthenticationController {
    ensureToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader !== undefined) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.body.token = bearerToken;
            next();
        }
        else {
            res.status(403).send();
        }
    }
    verifyToken(req, res, next) {
        jsonwebtoken_1.default.verify(req.body.token, 'secret_key', (err, data) => {
            if (err) {
                res.status(403).send();
            }
            else {
                next();
            }
        });
    }
    ensureAdmin(req, res, next) {
        const role = req.headers['role'];
        if (role === 'admin') {
            next();
        }
        else {
            res.status(403).send();
        }
    }
    ensureUser(req, res, next) {
        const role = req.headers['role'];
        if (role === 'user') {
            next();
        }
        else {
            res.status(403).send();
        }
    }
    async loginAdmin(req, res) {
        const { username, password } = req.body;
        const db = Database_1.default.getInstance().getDatabase();
        const admin = await db.aDMIN.findOne({
            where: {
                username: username
            }
        });
        if (admin.password === sha256_1.default(password).toString()) {
            const token = jsonwebtoken_1.default.sign({ username }, 'secret_key');
            res.send({ token: token, role: 'admin' });
        }
        else {
            res.status(403).send();
        }
    }
    async loginUser(req, res) {
        const { username, password } = req.body;
        const db = Database_1.default.getInstance().getDatabase();
        const admin = await db.voter.findOne({
            where: {
                username: username
            }
        });
        if (admin.password === sha256_1.default(password).toString()) {
            const token = jsonwebtoken_1.default.sign({ username }, 'secret_key');
            res.send({ token: token, role: 'user' });
        }
        else {
            res.status(403).send();
        }
    }
}
exports.default = AuthenticationController;
//# sourceMappingURL=AuthenticationController.js.map