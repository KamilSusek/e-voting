import express from "express";
import ElectionsRepo from "../repository/impl/ElectionsRepo";

const router = express.Router();

const elections = new ElectionsRepo();

router.get("/elections", async (req, res) => {
  try {
    const response = await elections.findAll();

    res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/election", async (req, res) => {
  try {
    const {
      election_name,
      election_description,
      start_date,
      end_date,
    } = req.body;
    const response = await elections.save({
      election_name,
      election_description,
      start_date,
      end_date,
    });

    res.status(201).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/election/set_user", async (req, res) => {
  try {
    const { voterName, electionName } = req.body;

    const response = await elections.setElectionToVoter(
      voterName,
      electionName
    );

    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default router;
