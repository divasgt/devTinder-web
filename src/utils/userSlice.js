import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload; // returning the user from action.payload, this will set user as this
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

// this is wierd, we have to export userSlice.reducer, not reducers.
export default userSlice.reducer;
