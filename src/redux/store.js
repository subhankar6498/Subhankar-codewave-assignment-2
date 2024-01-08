import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../UserReducer";

const store = configureStore({
  reducer: {
    users: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
