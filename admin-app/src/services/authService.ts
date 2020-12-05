import axios from '../axios/axios'

export const login = async (
  username: string,
  password: string,
  history: any
) => {
  try {
    const response = await axios.post('/admin/login', {
      username: username,
      password: password
    })

    localStorage.setItem('username', username)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('role', response.data.role)
    localStorage.setItem('token', response.data.token)
    history.push('/elections')
  } catch (error) {
    console.log(error)
  }
}

export const logout = async (history: any) => {
  localStorage.removeItem('username')
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('role')
  localStorage.removeItem('token')
  history.push('/')
}
