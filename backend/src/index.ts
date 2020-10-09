import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import auth from "./routes/authentication";
import users from "./routes/users";
import elections from "./routes/elections";

const app = express();
dotenv.config();
const port = 8080;

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", auth);
app.use("/", users);
app.use("/", elections);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
