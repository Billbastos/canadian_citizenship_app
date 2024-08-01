import { Dimensions } from 'react-native';

export const badgeColors = {
  people: ['#FFB7B2', '#ff8780'],
  geography: ['#FFDAC1', '#ffbc8f'],
  history: ['#E2F0CB', '#cce4a3'],
  politics: ['#B5EAD7', '#8ddec1'],
  citizenship: ['#C7CEEA', '#a1aedc'],
  government: ['#cbe2f0', '#a3cce5'],
  'rights and responsibilities': ['#f0cbd0', '#e5a3ac'],
  dates: ['#cbd0f0', '#a3ace5'],
  places: ['#d0f0cb', '#ace5a3'],
  culture: ['#e3f0cb', '#cee5a3'],
  economy: ['#cbf0eb', '#a3e5dc'],
  symbols: ['#f0dacb', '#e5bea3'],
};

const breakpoints = {
  xs: {
    size: 360,
    font: 12,
  },
  sm: {
    size: 414,
    font: 14,
  },
  md: {
    size: 1366,
    font: 14,
  },
  lg: {
    size: 1536,
    font: 14,
  },
  xl: {
    size: 1920,
    font: 14,
  },
};

export const theme = (() => {
  const windowWidth = Dimensions.get('window').width;

  if (windowWidth <= 360) {
    return breakpoints.xs;
  }

  if (windowWidth > 360 && windowWidth <= 414) {
    return breakpoints.sm;
  }

  if (windowWidth > 414 && windowWidth <= 1366) {
    return breakpoints.md;
  }

  if (windowWidth > 1366 && windowWidth <= 1536) {
    return breakpoints.lg;
  }

  if (windowWidth > 1536) {
    return breakpoints.xl;
  }
})();
