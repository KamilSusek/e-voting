import axios from "axios";

const API_URL = `http://localhost:8080`;

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
