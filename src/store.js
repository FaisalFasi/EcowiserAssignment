// store.js
import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./Slices/noteSlice";

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

export default store;
