import express from "express";
import VotersRepo from "../repository/impl/VotersRepo";

const router = express.Router();

const voters = new VotersRepo();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const response = await voters.findByUsername(username);

    if (response.password === password) {
      res.send();
    } else {
      res.status(403).send();
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/voters", async (req, res) => {
  try {
    const response = await voters.findAll();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/voter", async (req, res) => {
  try {
    const { username, password } = req.body;

    const response = await voters.save({ username, password });

    res.status(201).send();
  } catch (error) {
    console.log(error);

    res.status(400).send(error);
  }
});

export default router;
