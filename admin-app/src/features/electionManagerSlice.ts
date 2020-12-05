import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from '../store/store'
import axios from '../axios/axios'

const initialState = {
  election: {
    election_name: '',
    election_description: '',
    server_url: '',
    is_published: ''
  },
  candidates: [],
  voters: [],
  results: []
}

const electionManagerSlice = createSlice({
  name: 'electionManager',
  initialState: initialState,
  reducers: {
    setElection (state, action) {
      state.election = action.payload
    },
    setCandidates (state, action) {
      state.candidates = action.payload
    },
    setVoters (state, action) {
      state.voters = action.payload
    },
    setResults (state, action) {
      state.results = action.payload
    }
  }
})

export const {
  setElection,
  setCandidates,
  setVoters,
  setResults
} = electionManagerSlice.actions

export const fetchElection = (
  electionName: string
): AppThunk => async dispatch => {
  try {
    const response = await axios.get(`/election/${electionName}`, {
      headers: {
        role: localStorage.getItem('role'),
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    dispatch(setElection(response.data))
  } catch (error) {
    console.log(error)
  }
}

export const fetchCandidates = (
  electionName: string
): AppThunk => async dispatch => {
  try {
    const candidates = await axios.get(`/candidates/${electionName}`, {
      headers: {
        role: localStorage.getItem('role'),
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    dispatch(setCandidates(candidates.data))
  } catch (error) {
    console.log(error)
  }
}

export const fetchVoters = (
  electionName: string
): AppThunk => async dispatch => {
  try {
    const voters = await axios.get(`/voters/${electionName}`, {
      headers: {
        role: localStorage.getItem('role'),
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    dispatch(setVoters(voters.data))
  } catch (error) {
    console.log(error)
  }
}

export const publishElectionResults = (
  electionName: string
): AppThunk => async dispatch => {
  try {
    const response = await axios.post(`/election/publish`, {
      data: {
        electionName: electionName
      },
      headers: {
        role: localStorage.getItem('role'),
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const elections = await axios.get(`/election/${electionName}`, {
      headers: {
        role: localStorage.getItem('role'),
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    dispatch(setElection(elections.data))
  } catch (error) {
    console.log(error)
  }
}

export const fetchResults = (
  electionName: string
): AppThunk => async dispatch => {
  try {
    const response = await axios.get(`/score/${electionName}`, {
      headers: {
        role: localStorage.getItem('role'),
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    dispatch(setResults(response.data))
  } catch (error) {
    console.log(error)
  }
}

export default electionManagerSlice.reducer
