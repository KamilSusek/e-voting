import { createSlice } from '@reduxjs/toolkit'
import axios from '../api/axios'
import voteApi from '../api/voteApi'

import { AppThunk } from '../store'

const initialState = {
  electionsList: [],
  candidatesList: [],
  selectedElection: '',
  selectedVote: '',
  isCandidatesShown: false
}

const electionsSlice = createSlice({
  name: 'elections',
  initialState,
  reducers: {
    setElectionsList (state, action) {
      state.electionsList = action.payload
    },
    selectElection: (state, action) => {
      state.selectedElection = action.payload
    },
    setCandidates (state, action) {
      state.candidatesList = action.payload
    },
    showCandidates (state) {
      state.isCandidatesShown = true
    },
    showElections (state) {
      state.isCandidatesShown = false
    },
    selectVote (state, action) {
      state.selectedVote = action.payload
    }
  }
})

export const {
  setElectionsList,
  setCandidates,
  selectElection,
  showCandidates,
  showElections,
  selectVote
} = electionsSlice.actions

export const fetchElections = (): AppThunk => async dispatch => {
  try {
    const username = localStorage.getItem('username')
    const response = await axios.get(`/elections/${username}`)
    const electionList = response.data

    console.log(response.data)

    dispatch(setElectionsList(electionList))
  } catch (error) {
    console.log(error)
  }
}

export const fetchCandidatesForElection = (
  electionName: string
): AppThunk => async dispatch => {
  try {
    const response = await axios.get(`/candidates/${electionName}`)
    const candidates = response.data
    dispatch(setCandidates(candidates))
    dispatch(selectElection(electionName))
    dispatch(showCandidates())
  } catch (error) {
    console.log(error)
  }
}

export const sendVote = (
  electionName: any,
  candidate: any,
  handleResultInfo: Function
): AppThunk => async dispatch => {
  try {
    const username = localStorage.getItem('username')
    const response = await voteApi.post('/send-vote', {
      electionName: electionName,
      username: username,
      vote: candidate
    })
    dispatch(showElections())
    dispatch(fetchElections())
    dispatch(selectVote(''))
    handleResultInfo(true)
    console.log(response)
  } catch (error) {
    console.log(error)
    handleResultInfo(false)
  }
}

export default electionsSlice.reducer
