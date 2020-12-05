import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from '../store/store'
import moment from 'moment'
import axios from '../axios/axios'

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
    errors: {
      titleError: false,
      startDateError: false,
      endDateError: false,
      serverUrlError: false
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
    },
    setTitleError: (state, action) => {
      state.errors.titleError = action.payload
    },
    setStartDateError: (state, action) => {
      state.errors.startDateError = action.payload
    },
    setEndDateError: (state, action) => {
      state.errors.endDateError = action.payload
    },
    setServerUrlError: (state, action) => {
      state.errors.serverUrlError = action.payload
    }
  }
})

export const {
  setElectionFormState,
  setCandidates,
  setVoters,
  setTitleError,
  setStartDateError,
  setEndDateError,
  setServerUrlError
} = electionsFormSlice.actions

export const checkIfTitleExists = (
  electionTitle: string
): AppThunk => async dispatch => {
  try {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const response = await axios.get(`/election/${electionTitle}`, {
      headers: {
        role: role,
        authorization: `Bearer ${token}`
      }
    })
    const { data } = response
    if (data !== '') {
      dispatch(setTitleError(true))
    } else {
      dispatch(setTitleError(false))
    }
  } catch (error) {
    console.log(error)
  }
}

export const checkIfDateMatches = (
  startDate: string,
  endDate: string
): AppThunk => dispatch => {
  const start = moment(startDate)
  const end = moment(endDate)
  if (end <= start) {
    dispatch(setEndDateError(true))
    dispatch(setStartDateError(true))
  } else {
    dispatch(setEndDateError(false))
    dispatch(setStartDateError(false))
  }
}

export const checkIfServerUrlExists = (
  serverUrl: string
): AppThunk => async dispatch => {
  try {
    const response = await axios.get(`/serverUrl/?serverUrl=${serverUrl}`, {
      headers: {
        role: localStorage.getItem('role'),
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const { data } = response
    if (data !== '') {
      dispatch(setServerUrlError(true))
    } else {
      dispatch(setServerUrlError(false))
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchVoters = (): AppThunk => async dispatch => {
  try {
    const response = await axios.get('/voters', {
      headers: {
        role: localStorage.getItem('role'),
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    dispatch(setVoters(response.data))
  } catch (error) {
    console.log(error)
  }
}

export default electionsFormSlice.reducer
