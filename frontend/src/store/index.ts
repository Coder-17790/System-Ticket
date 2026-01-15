import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Mặc định là localStorage
import counterReducer from './slices/counterSlice';
import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';
import languageSlice from './slices/languageSlice';

// 1. Kết hợp tất cả reducers lại thành RootReducer
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  theme: themeReducer,
  language: languageSlice,
});

// 2. Cấu hình Persist (Những gì bạn muốn lưu lại khi F5)
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'theme', 'language'], // Chỉ lưu thông tin user và giao diện, counter sẽ bị reset
};

// 3. Tạo Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Khởi tạo Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Bỏ qua kiểm tra serializable cho các action của redux-persist để tránh báo lỗi console
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Khởi tạo Persistor
export const persistor = persistStore(store);

// Kiểu dữ liệu cho TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './slices/counterSlice';
// import userSlice from './slices/userSlice';
// import themeSlice from './slices/themeSlice';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     user: userSlice,
//     theme: themeSlice,
//   },
// });

// // Kiểu dữ liệu (nếu dùng TypeScript)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
