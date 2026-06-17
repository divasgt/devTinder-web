import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
    removeRequests: () => [],
  },
});

export const { addRequests, removeRequest, removeRequests } = requestsSlice.actions;

export default requestsSlice.reducer;
