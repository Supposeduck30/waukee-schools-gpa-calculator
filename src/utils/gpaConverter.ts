
export const convertToGPA = (percentage: number): number => {
  if (98 <= percentage && percentage <= 100) {
    return 4.33;
  } else if (93 <= percentage && percentage < 98) {
    return 4.0;
  } else if (90 <= percentage && percentage < 93) {
    return 3.67;
  } else if (87 <= percentage && percentage < 90) {
    return 3.33;
  } else if (83 <= percentage && percentage < 87) {
    return 3.0;
  } else if (80 <= percentage && percentage < 83) {
    return 2.67;
  } else if (77 <= percentage && percentage < 80) {
    return 2.33;
  } else if (73 <= percentage && percentage < 77) {
    return 2.0;
  } else if (70 <= percentage && percentage < 73) {
    return 1.67;
  } else if (67 <= percentage && percentage < 70) {
    return 1.33;
  } else if (63 <= percentage && percentage < 67) {
    return 1.0;
  } else if (60 <= percentage && percentage < 63) {
    return 0.67;
  } else {
    return 0.0;
  }
};
