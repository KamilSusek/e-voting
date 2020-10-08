import { createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

/** Slice */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    login: null,
  },
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = action.payload;
      state.login = null;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { setLoginStatus, setLogin, logout } = authSlice.actions;

export default authSlice.reducer;

export const handleLogin = (login, password, resultCallback) => async (
  dispatch
) => {
  try {
    const response = await axios.post("/login", {
      login: login,
      password: password,
    });
    console.log(response);
    if (response.status === 200) {
      dispatch(setLoginStatus(true));
      dispatch(setLogin(login));
      resultCallback(true);
    }
  } catch (error) {
    console.log(error);
  }
};
/** Actions */
