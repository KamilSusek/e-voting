import { createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

/** Slice */
const voteSlice = createSlice({
  name: "vote",
  initialState: {
    elections: null,
  },
  reducers: {
    setElections: (state, action) => {
      state.elections = action.payload;
    },
  },
});

export const { setElections } = voteSlice.actions;

export default voteSlice.reducer;

/** Actions */
export const fetchElections = (login) => async (dispatch) => {
  try {
    const response = await axios.get(`/elections/${login}`);
    dispatch(setElections(response.data.data.elections));
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
