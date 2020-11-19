import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from '../store/store'
import axios from 'axios'

const voterMenuSlice = createSlice({
  name: 'voterMenu',
  initialState: {
    voter: {
      username: ''
    },
    elections: []
  },
  reducers: {
    setElections: (state, action) => {
      state.elections = action.payload
    },
    setVoter: (state, action) => {
      state.voter.username = action.payload
    }
  }
})

export const { setElections, setVoter } = voterMenuSlice.actions

export const fetchVoter = (
  voterName: string,
  err: any
): AppThunk => async dispatch => {
  try {
    const response = await axios.get(`http://localhost:8080/voter/${voterName}`)
    const { username } = response.data
    dispatch(setVoter(username))
    if (!username) {
      err()
    }
  } catch (error) {
    err()
    console.log(error)
  }
}

export const fetchElections = (
  voterName: string
): AppThunk => async dispatch => {
  try {
    const response = await axios.get(
      `http://localhost:8080/elections/${voterName}`
    )
    const { data } = response
    dispatch(setElections(data))
  } catch (error) {
    console.log(error)
  }
}

export default voterMenuSlice.reducer
