// themeSize.ts
export type Size = {
  // base scale
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;

  // spacing
  pdXs: string;
  pdSm: string;
  pdMd: string;
  pdLg: string;

  mrXs: string;
  mrSm: string;
  mrMd: string;
  mrLg: string;

  // border radius
  rdsSm: string;
  rdsMd: string;
  rdsLg: string;

  // typography
  fontSm: string;
  fontMd: string;
  fontLg: string;

  // layout
  maxW: string;
  contPad: string;

  // gaps
  gapSm: string;
  gapMd: string;
  gapLg: string;
};

export const defaultSize: Size = {
  // base
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',

  // padding
  pdXs: '4px',
  pdSm: '8px',
  pdMd: '12px',
  pdLg: '16px',

  // margin
  mrXs: '4px',
  mrSm: '8px',
  mrMd: '12px',
  mrLg: '16px',

  // radius
  rdsSm: '4px',
  rdsMd: '8px',
  rdsLg: '12px',

  // font
  fontSm: '12px',
  fontMd: '14px',
  fontLg: '18px',

  // layout
  maxW: '1200px',
  contPad: '24px',

  // gap
  gapSm: '4px',
  gapMd: '8px',
  gapLg: '16px',
};
