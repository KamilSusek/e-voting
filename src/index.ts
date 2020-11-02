import express from "express";
import bodyParser from "body-parser";
import voterRoutes from "./routes/voter";
import electionRoutes from "./routes/election";
import candidateRoutes from "./routes/candidate";

const HTTP_PORT = 8080;

const app = express();

app.use(bodyParser());

// Routes
app.use(voterRoutes);
app.use(electionRoutes);
app.use(candidateRoutes);

app.listen(HTTP_PORT, () => {
  console.log(`Server started at ${HTTP_PORT}`);
});
