import { findById, findAll } from "../repos/elections";

export function getElectionById(req: any, res: any) {
  const { id } = req.params;
  return findById(id)
    .then((response) => {
      console.log(response);
      res.send("ok");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("ok");
    });
}

export function getAllElections(req: any, res: any) {
  return findAll()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send();
    });
}
