"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elections_1 = require("../middlewares/repos/elections");
const express_1 = require("express");
const router = express_1.Router();
router.post("/election", elections_1.createElection);
router.get("/elections", elections_1.findAll);
router.get("/election/id/:id", elections_1.findById);
router.post("/elections/assign", elections_1.assignUserToElection);
router.get("/elections/assigned", elections_1.getAllAssignedEllections);
router.get("/elections/user/:username", elections_1.getElectionsForUser);
router.get("/elections/options/:title", elections_1.getOptionsForElection);
exports.default = router;
//# sourceMappingURL=elections.js.map