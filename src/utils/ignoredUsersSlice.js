import { createSlice } from "@reduxjs/toolkit";

const ignoredUsersSlice = createSlice({
  name: "ignoredUsers",
  initialState: [],
  reducers: {
    addIgnoredUsers: (state, action) => action.payload,
    removeIgnoredUsers: () => [],
  },
});

export const { addIgnoredUsers, removeIgnoredUsers } =
  ignoredUsersSlice.actions;

export default ignoredUsersSlice.reducer;
