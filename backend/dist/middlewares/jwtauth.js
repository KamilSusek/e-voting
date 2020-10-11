"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.verify = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users = [];
function login(req, res) {
    const username = req.body.username;
    if (!username)
        return res.status(401).send();
    const payload = { username };
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10h",
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_LIFE,
    });
    users.push({ username, refreshToken });
    // console.log(accessToken, refreshToken);
    res.cookie("jwt", accessToken);
    res.send({ token: accessToken });
}
exports.login = login;
function verify(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, username) => {
        //  console.log(err);
        if (err)
            return res.sendStatus(403);
        req.username = username;
        // console.log(username);
        next();
    });
}
exports.verify = verify;
function refresh(req, res) {
    const accessToken = req.cookies.jwt;
    if (!accessToken) {
        return res.status(403).send();
    }
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    }
    catch (e) {
        return res.status(401).send();
    }
    const refreshToken = users.find((user) => user.username === payload.username).refreshToken;
    try {
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    }
    catch (e) {
        return res.status(401).send();
    }
    const newToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });
    res.cookie("jwt", newToken);
    res.send();
}
exports.refresh = refresh;
//# sourceMappingURL=jwtauth.js.map