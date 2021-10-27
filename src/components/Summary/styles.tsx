export const glassmorphism = {
  background: 'rgba(0, 0, 0, 0.21)',
  backdropFilter: 'blur(3.1px)',
  boxShadow: '0 4px 30px rgb(0 0 0 / 10%)',
};

export const selectedPlanFlex = {
  ...glassmorphism,
  alignContent: 'center',
  borderRadius: '2xl',
  color: 'white',
  height: { base: '40vw', md: '30vw', lg: '18vw' },
  justifyContent: 'center',
  m: '0 auto',
  width: { base: '60vw', lg: '20vw' },
};

export const heading = {
  size: 'md',
  color: 'white',
  mt: { base: '30px', lg: '0' },
  mb: '5',
};

export const textV1 = {
  fontSize: { base: 'sm', md: 'md' },
  w: '100%',
};

export const textv2 = {
  fontWeight: 'semibold',
  fontSize: { base: 'lg', md: 'xl', lg: '3xl' },
  mt: '5',
};

export const flexBox = {
  color: 'white',
  fontWeight: '500',
  padding: '8',
  flexWrap: 'wrap',
  borderRadius: '2xl',
  width: { base: '60vw', lg: '20vw' },
  margin: '0 auto',
  mt: '12',
};

export const text = {
  marginBottom: '5',
  w: '50%',
};

export const box = {
  marginBottom: '5',
  height: '1px',
  width: '100%',
  borderBottom: '2px',
};
