import { configureStore } from '@reduxjs/toolkit';
import deviceReducer from 'redux/slices/deviceSlice';
import ReactotronConfig from 'ReactotronConfig';

export const store = configureStore({
  reducer: {
    device: deviceReducer,
  },
  // TODO fix this problem
  enhancers: [ReactotronConfig?.createEnhancer()],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
