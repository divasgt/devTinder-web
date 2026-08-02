import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice";
import connectionsReducer from "./slices/connectionsSlice";
import requestsReducer from "./slices/requestsSlice";
import ignoredUsersReducer from "./slices/ignoredUsersSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
    ignoredUsers: ignoredUsersReducer,
  },
});

export default appStore;
