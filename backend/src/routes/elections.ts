import {
  getElectionById,
  createElection,
  getAllElections,
  assignUserToElection,
  getAllAssignedEllections,
  getElectionsForUser,
  getOptionsForElection,
} from "../middlewares/repos/elections";
import { Router } from "express";

const router = Router();

router.post("/election", createElection);

router.get("/elections", getAllElections);

router.get("/election/id/:id", getElectionById);

router.post("/elections/assign", assignUserToElection);

router.get("/elections/assigned", getAllAssignedEllections);

router.get("/elections/user/:username", getElectionsForUser);

router.get("/elections/options/:title", getOptionsForElection);

export default router;
