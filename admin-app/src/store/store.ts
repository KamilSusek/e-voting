import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { combineReducers } from '@reduxjs/toolkit'
import electionFormSlice from '../features/electionFormSlice'
import voterMenuSlice from '../features/voterMenuSlice'
import electionManagerSlice from '../features/electionManagerSlice'

const rootReducer = combineReducers({
  electionManager: electionManagerSlice,
  election: electionFormSlice,
  voter: voterMenuSlice
})
export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: rootReducer
})
export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
