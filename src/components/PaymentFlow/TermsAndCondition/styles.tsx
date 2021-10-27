export const grid = {
  display: { base: 'block', lg: 'grid' },
  templateColumns: 'repeat(2, 1fr)',
  gap: 14,
};

export const marker = {
  width: '30px',
  height: '30px',
  background: 'red.600',
  borderRadius: '3xl',
  border: '1px',
  borderColor: 'black',
};

export const buttonContinue = {
  colorScheme: 'orange',
  mb: { base: '24px', lg: '0' },
  order: 2,
  w: { base: '100%', md: '30%', lg: 'auto' },
};

export const buttonBack = {
  colorScheme: 'orange',
  mr: '8',
  order: 1,
  w: { base: '100%', md: '30%', lg: 'auto' },
};
