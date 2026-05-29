import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnections: () => [],
  },
});

export const { addConnections, removeConnection } = connectionsSlice.actions;

export default connectionsSlice.reducer;
