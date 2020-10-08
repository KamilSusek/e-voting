const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const VOTERS_DB = [
  {
    id: 0,
    login: "u1",
    password: "p1234",
    elections: [
      {
        electionTitle: "president",
        description: "Vote for president",
        options: [{ id: 0, name: "Jan Kowalski", description: "" }],
      },
      {
        electionTitle: "president",
        description: "Vote for president",
        options: [{ id: 1, name: "Jan Kowalski", description: "" }],
      },
      {
        electionTitle: "president",
        description: "Vote for president",
        options: [{ id: 2, name: "Jan Kowalski", description: "" }],
      },
      {
        electionTitle: "president",
        description: "Vote for president",
        options: [{ id: 3, name: "Jan Kowalski", description: "" }],
      },
      {
        electionTitle: "president",
        description: "Vote for president",
        options: [{ id: 4, name: "Jan Kowalski", description: "" }],
      },
    ],
  },
  {
    id: 1,
    login: "u2",
    password: "p1234",
    elections: [
      {
        electionTitle: "president",
        description: "Vote for president",
        options: [{ id: 0, name: "Jan Kowalski", description: "" }],
      },
      { electionTitle: "government" },
    ],
  },
  {
    id: 2,
    login: "u3",
    password: "p1234",
    elections: [
      {
        electionTitle: "president",
        description: "Vote for president",
        options: [{ id: 0, name: "Jan Kowalski", description: "" }],
      },
      { electionTitle: "government" },
    ],
  },
  {
    id: 3,
    login: "u4",
    password: "p1234",
    elections: [
      {
        electionTitle: "president",
        description: "Vote for president",
        options: [{ id: 0, name: "Jan Kowalski", description: "" }],
      },
      { electionTitle: "government" },
    ],
  },
];

app.post("/login", (req, res) => {
  const { login, password } = req.body;
  const user = VOTERS_DB.find((voter) => {
    if (voter.login === login) return voter;
  });

  if (user) {
    if (user.password === password) {
      res.status(200).send(login);
    } else {
      res.status(400).send();
    }
  } else {
    res.status(400).send();
  }
});

app.get("/elections/:login", (req, res) => {
  const { login } = req.params;
  if (login) {
    const data = VOTERS_DB.find((voter) => {
      if (voter.login === login) return voter;
    });
    if (data) {
      res.status(200).send({ data: data });
    } else {
      res.status(400).send();
    }
  } else {
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
