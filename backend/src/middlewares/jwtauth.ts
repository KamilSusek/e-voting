import jwt from "jsonwebtoken";
const users: any[] = [];

export function login(req: any, res: any) {
  const username = req.body.username;
  if (!username) return res.status(401).send();

  const payload = { username };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10h",
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });

  users.push({ username, refreshToken });
  // console.log(accessToken, refreshToken);
  res.cookie("jwt", accessToken);
  res.send({ token: accessToken });
}

export function verify(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: any, username: any) => {
      //  console.log(err);
      if (err) return res.sendStatus(403);
      req.username = username;
      // console.log(username);
      next();
    }
  );
}

export function refresh(req: any, res: any) {
  const accessToken = req.cookies.jwt;

  if (!accessToken) {
    return res.status(403).send();
  }

  let payload: any;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (e) {
    return res.status(401).send();
  }

  const refreshToken = users.find(
    (user: any) => user.username === payload.username
  ).refreshToken;

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (e) {
    return res.status(401).send();
  }

  const newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

  res.cookie("jwt", newToken);
  res.send();
}
