import axios from "../axios";

export async function handleLogin(login, password, resultCallback) {
  try {
    const response = await axios.post("/login", {
      login: login,
      password: password,
    });
    resultCallback(true);
  } catch (error) {
    console.log(error);
    resultCallback(false);
  }
}
