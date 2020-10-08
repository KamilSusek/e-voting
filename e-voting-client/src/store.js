import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/authSlice";
import vote from "./features/voteSlice";

import { combineReducers } from "redux";
const reducer = combineReducers({
  auth,
  vote,
});
const store = configureStore({
  reducer,
});
export default store;
