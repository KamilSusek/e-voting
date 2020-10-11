"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtauth_1 = require("../middlewares/jwtauth");
const router = express_1.Router();
router.post("/login", jwtauth_1.login);
router.post("/do", jwtauth_1.verify, (req, res) => {
    res.send("ok");
});
exports.default = router;
//# sourceMappingURL=authentication.js.map