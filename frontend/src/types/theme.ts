// themeTypes.ts
export type Color = {
  text: string;
  background: string;
  primary: string;
  secondary: string;
  accent: string;
};

export const lightTheme: Color = {
  text: '#0f1713',
  background: '#f6faf8',
  primary: '#61b788',
  secondary: '#94d7b3',
  accent: '#62d095',
};

export const darkTheme: Color = {
  text: '#f6faf8',
  background: '#0f1713',
  primary: '#62d095',
  secondary: '#61b788',
  accent: '#94d7b3',
};

export type ThemeMode = 'light' | 'dark';