import { Router } from "express";
import { login, verify, refresh } from "../middlewares/jwtauth";

const router = Router();

router.post("/login", login);

router.post("/do", verify, (req, res) => {
  res.send("ok");
});

export default router;
