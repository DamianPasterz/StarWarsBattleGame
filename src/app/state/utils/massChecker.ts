export const processMass = (mass: string | number): number => {
  if (mass === 'unknown') {
    return Math.floor(Math.random() * 150) + 1;
  } else if (typeof mass === 'number') {
    return Math.round(mass);
  } else {
    const numericMass = parseFloat(mass);
    if (isNaN(numericMass)) {
      return 42; // Dlaczego 42? bo 42 jest odpowiedzią na wszystko :D
    } else {
      return Math.round(numericMass);
    }
  }
};
