import { Color, darkTheme, lightTheme, ThemeMode } from '@/types/theme';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  mode: 'light' | 'dark';
  color: Color;
}

const initialState: ThemeState = {
  mode: 'light',
  color: lightTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state, actions: PayloadAction<ThemeMode>) => {
      if (state.mode === 'light') {
        state.mode = 'dark';
        state.color = darkTheme;
      } else {
        state.mode = 'light';
        state.color = lightTheme;
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
