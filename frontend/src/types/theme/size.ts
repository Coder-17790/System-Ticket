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

  // height
  heSX: string;
  heSm: string;
  heMd: string;
  heLg: string;
  heXl: string;

  // width
  wiSX: string;
  wiSm: string;
  wiMd: string;
  wiLg: string;
  wiXl: string;
};

export const defaultSize: Size = {
  // base
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',

  // padding
  pdXs: '5px',
  pdSm: '10px',
  pdMd: '15px',
  pdLg: '20px',
  pdXl: '25px',

  // margin
  mrXs: '5px',
  mrSm: '10px',
  mrMd: '15px',
  mrLg: '20px',
  mrXl: '25px',

  // radius
  rdsXs: '2px',
  rdsSm: '4px',
  rdsMd: '8px',
  rdsLg: '12px',
  rdsXl: '16px',

  // font
  fontXs: '10px',
  fontSm: '14px',
  fontMd: '20px',
  fontLg: '28px',
  fontXl: '36px',

  // layout
  maxW: '1200px',
  contPadXs: '8px',
  contPadSm: '12px',
  contPadMd: '16px',
  contPadLg: '24px',
  contPadXl: '32px',

  // gap
  gapXs: '5px',
  gapSm: '10px',
  gapMd: '20px',
  gapLg: '25px',
  gapXl: '40px',

  // icon
  icXs: '8px',
  icSm: '12px',
  icMd: '16px',
  icLg: '24px',
  icXl: '32px',

  // height
  heSX: '10px',
  heSm: '50px',
  heMd: '100px',
  heLg: '250px',
  heXl: '500px',

  // width
  wiSX: '10px',
  wiSm: '50px',
  wiMd: '100px',
  wiLg: '250px',
  wiXl: '500px',
};
