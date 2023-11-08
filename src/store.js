// store.js

import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./slices/noteSlice";

const store = configureStore({
  reducer: {
    notes: notesReducer,
    // auth: authReducer,s
  },
});

export default store;
