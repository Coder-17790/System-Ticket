// src/hooks/useColors.ts
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Theme } from '@/types';

export function useStyles(): Theme {
  const colors = useSelector((state: RootState) => state.theme);
  return colors;
}
