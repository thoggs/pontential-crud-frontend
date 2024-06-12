import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "@/app/store/reducers/rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
