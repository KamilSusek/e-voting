import axios from "axios";

const API_URL = 'http://192.168.55.105:4000'//`https://agile-lake-39533.herokuapp.com`;

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
