export const glassmorphism = {
  background: "rgba(0, 0, 0, 0.21)",
  backdropFilter: "blur(3.1px)",
  boxShadow: "0 4px 30px rgb(0 0 0 / 10%)",
}

export const selectedPlanFlex = {
  ...glassmorphism,
  alignContent: "center",
  borderRadius: "2xl",
  color: 'white',
  height: {base:"40vw", md: "30vw", lg: '18vw' },
  justifyContent: "center",
  m: "0 auto",
  width: {base:"60vw", lg: '20vw' },
}