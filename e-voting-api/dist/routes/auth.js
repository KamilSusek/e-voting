"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureUser = exports.ensureAdmin = exports.verifyToken = exports.ensureToken = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sha256_1 = __importDefault(require("crypto-js/sha256"));
const Database_1 = __importDefault(require("../model/database/Database"));
const router = express_1.default.Router();
router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    const db = Database_1.default.getInstance().getDatabase();
    const admin = await db.aDMIN.findOne({
        where: {
            username: username
        }
    });
    if (admin && admin.password === sha256_1.default(password).toString()) {
        const token = jsonwebtoken_1.default.sign({ username }, 'secret_key');
        res.send({ token: token, role: 'admin' });
    }
    else {
        res.status(403).send();
    }
});
router.get('/api-ping', ensureToken, verifyToken, ensureAdmin, (req, res) => {
    res.send('ok');
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = Database_1.default.getInstance().getDatabase();
    const voter = await db.voter.findOne({
        where: {
            username: username
        }
    });
    if (voter.password === password) {
        //sha256(password).toString()) {
        const token = jsonwebtoken_1.default.sign({ username }, 'secret_key');
        res.send({ token: token, role: 'user' });
    }
    else {
        res.status(403).send();
    }
});
function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
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
exports.ensureToken = ensureToken;
function verifyToken(req, res, next) {
    console.log(req.body.token);
    jsonwebtoken_1.default.verify(req.body.token, 'secret_key', (err, data) => {
        if (err) {
            res.status(403).send();
        }
        else {
            next();
        }
    });
}
exports.verifyToken = verifyToken;
function ensureAdmin(req, res, next) {
    const role = req.headers['role'];
    if (role === 'admin') {
        next();
    }
    else {
        res.status(403).send();
    }
}
exports.ensureAdmin = ensureAdmin;
function ensureUser(req, res, next) {
    const role = req.headers['role'];
    if (role === 'user') {
        next();
    }
    else {
        res.status(403).send();
    }
}
exports.ensureUser = ensureUser;
exports.default = router;
//# sourceMappingURL=auth.js.map