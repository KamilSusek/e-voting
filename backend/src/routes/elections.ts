import {
  findById,
  createElection,
  findAll,
  assignUserToElection,
  getAllAssignedEllections,
  getElectionsForUser,
  getOptionsForElection,
} from "../middlewares/repos/elections";
import { Router } from "express";

const router = Router();

router.post("/election", createElection);

router.get("/elections", findAll);

router.get("/election/id/:id", findById);

router.post("/elections/assign", assignUserToElection);

router.get("/elections/assigned", getAllAssignedEllections);

router.get("/elections/user/:username", getElectionsForUser);

router.get("/elections/options/:title", getOptionsForElection);

export default router;
