import { configureStore } from '@reduxjs/toolkit';
import certificatesSlice from './slices/certificates';

export const store = configureStore({
  reducer: {
    certificates: certificatesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
