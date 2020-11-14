import axios from 'axios'

const VOTE_API_URL = `http://localhost:8080`

const instance = axios.create({
  baseURL: VOTE_API_URL
})

export default instance
