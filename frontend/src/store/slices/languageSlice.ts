import i18n from '@/i18n';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type languageType = 'english' | 'vietnam';

type LanguageState = {
  language: languageType;
};

const initialState: LanguageState = {
  language: 'english',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, actions: PayloadAction<languageType>) => {
      state.language = actions.payload;
      i18n.changeLanguage(actions.payload);
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
