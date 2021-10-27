import { css } from '@emotion/react';

export const cellIcon = css({
  display: 'flex',
  justifyContent: 'center',
});

export const tr = {
  top: '-1px',
  bg: 'linear-gradient(90deg, hsla(238, 100%, 71%, 1) 0%, hsl(295deg 68% 73%) 100%)',
};

export const thTitle = {
  color: 'white',
  borderLeft: '1px solid rgb(0 0 0 / 6%)',
  p: 8,
  fontSize: { base: '0.85em', lg: '1em' },
};

export const thFoot = {
  color: 'white',
  fontSize: '0.9em',
};

export const circle = {
  size: '30px',
  bg: 'red.500',
  color: 'white',
};
