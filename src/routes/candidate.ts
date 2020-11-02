import express from "express";
import CandidatesRepo from "../repository/impl/CandidatesRepo";

const router = express.Router();

const candidates = new CandidatesRepo();

router.post("/candidate/set_election", async (req, res) => {
  try {
    const { candidate_name, candidate_description, electionName } = req.body;
    const response = await candidates.saveCandidateToElection(
      { candidate_name, candidate_description },
      electionName
    );

    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

export default router;
