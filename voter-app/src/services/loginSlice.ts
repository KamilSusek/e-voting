import { createSlice } from '@reduxjs/toolkit'
import { login } from '../api/loginApi'
import axios from '../api/axios'
import { AppThunk } from '../store'

const initialState = {
  username: '',
  password: '',
  open: false,
  isLoggedIn: false
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername (state, action) {
      state.username = action.payload
    },
    setPassword (state, action) {
      state.password = action.payload
    },
    setOpen (state, action) {
      state.open = action.payload
    },
    setLoggedOut (state) {
      state.isLoggedIn = false
    },
    setLoggedIn (state) {
      state.isLoggedIn = true
    }
  }
})

export const {
  setUsername,
  setPassword,
  setOpen,
  setLoggedIn,
  setLoggedOut
} = loginSlice.actions

export const handleLogin = (
  username: string,
  password: string,
  onResult: any
): AppThunk => async dispatch => {
  try {
    const resposne = await axios.post('/login', {
      username: username,
      password: password
    })
    console.log(resposne)

    dispatch(setLoggedIn())
    dispatch(setOpen(false))
    dispatch(setUsername(''))
    dispatch(setPassword(''))

    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('username', username)
    localStorage.setItem('token', resposne.data.token)
    localStorage.setItem('role', resposne.data.role)

    onResult(true)
  } catch (error) {
    onResult(false)

    console.log(error)
  }
}

export const handleLogout = (): AppThunk => async dispatch => {
  try {
    dispatch(setLoggedOut())
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    localStorage.removeItem('role')
  } catch (error) {}
}

export default loginSlice.reducer
