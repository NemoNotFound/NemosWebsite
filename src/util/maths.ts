/*
  floor to significant digits
*/
export const ftsd = (number: number, sigDigits: number): number => {
  if (number === 0) return 0;

  const digitCount = Math.abs(number).toString().length;
  const factor = Math.pow(10, digitCount - sigDigits);

  return Math.floor(number / factor) * factor;
};
