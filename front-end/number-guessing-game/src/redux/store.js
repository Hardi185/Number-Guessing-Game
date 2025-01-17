import { configureStore } from '@reduxjs/toolkit';
import attemptsReducer from './attemptsSlice';

const store = configureStore({
  reducer: {
    attempts: attemptsReducer,
  },
});

export default store;
