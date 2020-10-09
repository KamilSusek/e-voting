import {
  createUsers,
  getAllUsers,
  getUserByUsername,
  getById,
  deleteUserById,
} from "../middlewares/repos/users";
import { Router } from "express";

const router = Router();

router.post("/user", createUsers);

router.get("/users", getAllUsers);

router.get("/user/username/:username", getUserByUsername);

router.get("/user/id/:id", getById);

router.delete("/user/id/:id", deleteUserById);

export default router;
