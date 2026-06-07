const LB_PER_KG = 2.2046226218;
const CM_PER_IN = 2.54;

export function lbToKg(lb: number): number {
  return lb / LB_PER_KG;
}

export function kgToLb(kg: number): number {
  return kg * LB_PER_KG;
}

export function inToCm(inches: number): number {
  return inches * CM_PER_IN;
}

export function cmToIn(cm: number): number {
  return cm / CM_PER_IN;
}

export function ftInToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * CM_PER_IN;
}

export function cmToFtIn(cm: number): { feet: number; inches: number } {
  const totalInches = cm / CM_PER_IN;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round((totalInches - feet * 12) * 10) / 10;
  return { feet, inches };
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function round0(n: number): number {
  return Math.round(n);
}
