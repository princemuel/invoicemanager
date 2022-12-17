export const BASE_URL = '';
export const CURRENCY_SYMBOL = '$';

export const BREAKPOINT_SIZES = {
  xs: 320,
  sm: 576,
  sx: 640,
  md: 720,
  lg: 1040,
  xl: 1200,
  xxl: 1500,
  xxxl: 1800,
  // xxl: 1440,
} as const;

export const READING_WIDTH = 850;
export const EXTRA_WIDE_WIDTH = 1024;

const deviceRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i;

const userAgent =
  typeof window !== 'undefined' ? window.navigator.userAgent : 'node';

export const CURRENT_USER_AGENT = deviceRegex.test(userAgent);

export const Z_INDICES = {
  hero: 1,
  main: 10,
  header: 100,
};
