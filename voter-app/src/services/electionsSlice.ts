import { createSlice } from '@reduxjs/toolkit'
import axios from '../api/axios'
import voteApi from '../api/voteApi'

import { AppThunk } from '../store'

const initialState = {
  electionsList: [],
  candidatesList: [],
  selectedElection: '',
  selectedVote: '',
  isCandidatesShown: false,
  isResultsShown: false,
  electionResults: []
}

const electionsSlice = createSlice({
  name: 'elections',
  initialState,
  reducers: {
    setElectionsList (state, action) {
      state.electionsList = action.payload
    },
    selectElection (state, action) {
      state.selectedElection = action.payload
    },
    setCandidates (state, action) {
      state.candidatesList = action.payload
    },
    setElectionResults (state, action) {
      state.electionResults = action.payload
    },
    showCandidates (state) {
      state.isCandidatesShown = true
      state.isResultsShown = false
    },
    showElections (state) {
      state.isCandidatesShown = false
      state.isResultsShown = false
    },
    showResults (state) {
      state.isCandidatesShown = false
      state.isResultsShown = true
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
  setElectionResults,
  showCandidates,
  showElections,
  showResults,
  selectVote
} = electionsSlice.actions

export const fetchElections = (): AppThunk => async dispatch => {
  try {
    const username = localStorage.getItem('username')
    const response = await axios.get(`/elections/${username}`, {
      headers: {
        role: localStorage.getItem('role'),
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
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
    const response = await axios.get(`/candidates/${electionName}`, {
      headers: {
        role: localStorage.getItem('role'),
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
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
    const response = await voteApi.post(
      '/send-vote',
      {
        electionName: electionName,
        username: username,
        vote: candidate
      },
      {
        headers: {
          role: localStorage.getItem('role'),
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    dispatch(showElections())
    dispatch(fetchElections())
    dispatch(selectVote(''))
    handleResultInfo(true)
  } catch (error) {
    console.log(error)
    handleResultInfo(false)
  }
}

export const fetchElectionResults = (
  electionName: any
): AppThunk => async dispatch => {
  try {
    const response = await axios.get(`/voting/result/${electionName}`, {
      headers: {
        role: localStorage.getItem('role'),
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response.data)
    dispatch(setElectionResults(response.data))
    dispatch(showResults())
  } catch (error) {
    console.log(error)
  }
}

export default electionsSlice.reducer
