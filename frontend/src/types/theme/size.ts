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
  pdXl: string;

  mrXs: string;
  mrSm: string;
  mrMd: string;
  mrLg: string;
  mrXl: string;

  // border radius
  rdsXs: string;
  rdsSm: string;
  rdsMd: string;
  rdsLg: string;
  rdsXl: string;

  // typography
  fontXs: string;
  fontSm: string;
  fontMd: string;
  fontLg: string;
  fontXl: string;

  // layout
  maxW: string;
  contPadXs: string;
  contPadSm: string;
  contPadMd: string;
  contPadLg: string;
  contPadXl: string;

  // gaps
  gapXs: string;
  gapSm: string;
  gapMd: string;
  gapLg: string;
  gapXl: string;

  // icon
  icXs: string;
  icSm: string;
  icMd: string;
  icLg: string;
  icXl: string;
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
  pdXl: '24px',

  // margin
  mrXs: '4px',
  mrSm: '8px',
  mrMd: '12px',
  mrLg: '16px',
  mrXl: '24px',

  // radius
  rdsXs: '2px',
  rdsSm: '4px',
  rdsMd: '8px',
  rdsLg: '12px',
  rdsXl: '16px',

  // font
  fontXs: '10px',
  fontSm: '12px',
  fontMd: '14px',
  fontLg: '18px',
  fontXl: '24px',

  // layout
  maxW: '1200px',
  contPadXs: '8px',
  contPadSm: '12px',
  contPadMd: '16px',
  contPadLg: '24px',
  contPadXl: '32px',

  // gap
  gapXs: '4px',
  gapSm: '8px',
  gapMd: '12px',
  gapLg: '16px',
  gapXl: '24px',

  // icon
  icXs: '8px',
  icSm: '12px',
  icMd: '16px',
  icLg: '24px',
  icXl: '32px',
};
