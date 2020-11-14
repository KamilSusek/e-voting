import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from '../store/store'
import axios from 'axios'

const electionsFormSlice = createSlice({
  name: 'electionsForm',
  initialState: {
    electionFormState: {
      election_name: '',
      election_description: '',
      start_date: '',
      end_date: '',
      server_url: ''
    },
    candidates: [{ candidate_name: '', candidate_description: '' }],
    voters: [],
    checked: []
  },
  reducers: {
    setElectionFormState: (state, action) => {
      state.electionFormState = action.payload
    },
    setCandidates: (state, action) => {
      state.candidates = action.payload
    },
    setVoters: (state, action) => {
      state.voters = action.payload
      state.checked = action.payload.length
    }
  }
})

export const {
  setElectionFormState,
  setCandidates,
  setVoters
} = electionsFormSlice.actions

export const fetchVoters = (): AppThunk => async dispatch => {
  try {
    const response = await axios.get('http://localhost:8080/voters')
    dispatch(setVoters(response.data))
  } catch (error) {}
}

export default electionsFormSlice.reducer
