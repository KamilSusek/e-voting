"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../middlewares/repos/users");
const express_1 = require("express");
const router = express_1.Router();
router.post("/user", users_1.createUsers);
router.get("/users", users_1.getAllUsers);
router.get("/user/username/:username", users_1.getUserByUsername);
router.get("/user/id/:id", users_1.getById);
router.delete("/user/id/:id", users_1.deleteUserById);
exports.default = router;
//# sourceMappingURL=users.js.map