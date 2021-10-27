import { css } from '@emotion/react';

export const formControl = css({
  '.react-tel-input .form-control.invalid-number': {
    backgroundColor: 'white',
    borderColor: '#E53E3E',
    boxShadow: '0 0 0 1px #e53e3e',
  },

  '.react-tel-input .form-control': {
    height: '48px',
    borderColor: 'rgb(226, 232, 240)',
    width: '100%',
    backgroundColor: 'white',
    color: '#6B46C1',
  },
});

export const buttonContinue = {
  order: 2,
  mb: { base: '24px', md: '0', lg: '0' },
  w: { base: '100%', md: '30%', lg: 'auto' },
  colorScheme: 'orange',
};

export const buttonBack = {
  order: 1,
  w: { base: '100%', md: '30%', lg: 'auto' },
  mr: '8',
  colorScheme: 'orange',
};

export const buttonsWrapper = {
  display: { base: 'block', md: 'flex' },
  mt: '16',
  justify: 'flex-end',
};
