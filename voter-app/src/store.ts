import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction
} from '@reduxjs/toolkit'
import loginReducer from './services/loginSlice'
import electionsSlice from './services/electionsSlice'

const rootReducer = combineReducers({
  login: loginReducer,
  elections: electionsSlice
})

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
