// themeTypes.ts
export type Color = {
  text: string;
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  disable: string;
  border: string;
  white: string;
  black: string;
  error: string;
};

export const lightTheme: Color = {
  text: '#0f1713',
  background: '#f6faf8',
  primary: '#61b788',
  secondary: '#94d7b3',
  accent: '#62d095',
  disable: ' #cccccc',
  border: '#9f9a9a',
  white: '#f6faf8',
  black: '#0f1713',
  error: '#e60000',
};

export const darkTheme: Color = {
  text: '#f6faf8',
  background: '#0f1713',
  primary: '#61b788',
  secondary: '#94d7b3',
  accent: '#62d095',
  disable: '#555555',
  border: '#9f9a9a',
  white: '#f6faf8',
  black: '#0f1713',
  error: '#e60000',
};

export type ThemeMode = 'light' | 'dark';
