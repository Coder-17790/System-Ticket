import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import userSlice from './slices/userSlice';
import themeSlice from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    use: userSlice,
    theme: themeSlice,
  },
});

// Kiểu dữ liệu (nếu dùng TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
