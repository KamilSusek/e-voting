import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080'//'https://agile-lake-39533.herokuapp.com'
})

export default instance
