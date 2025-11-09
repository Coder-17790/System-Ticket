// src/hooks/useColors.ts
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Color } from '@/types/theme';

export function useColors(): Color {
  const colors = useSelector((state: RootState) => state.theme);
  return colors.color;
}
