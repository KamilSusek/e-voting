import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios";

const initialState = {
  login: "",
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state, action: any) {
      state.login = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.login = "";
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export const handleLogin = (
  loginCredentials: any,
  resultCallback: Function
) => async (dispatch: any) => {
  try {
    const { username } = loginCredentials;
    const response = await axios.post("/auth/login", loginCredentials);
    dispatch(login(username));
    resultCallback();
  } catch (err) {}
};

export default loginSlice.reducer;
