export const letterToGPA = (letter: string): number => {
  const cleanLetter = letter.trim().toUpperCase();
  const mapping: { [key: string]: number } = {
    "A+": 4.33, "A": 4.00, "A-": 3.67,
    "B+": 3.33, "B": 3.00, "B-": 2.67,
    "C+": 2.33, "C": 2.00, "C-": 1.67,
    "D+": 1.33, "D": 1.00, "D-": 0.67,
    "F": 0.00
  };
  
  if (!(cleanLetter in mapping)) {
    return 0.00; // Default to F if invalid grade
  }
  
  return mapping[cleanLetter];
};

export const getNextGrade = (currentGrade: string): string => {
  const grades = ["F", "D-", "D", "D+", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+"];
  const currentIndex = grades.indexOf(currentGrade.trim().toUpperCase());
  if (currentIndex === -1 || currentIndex === grades.length - 1) {
    return currentGrade;
  }
  return grades[currentIndex + 1];
};

export const getPreviousGrade = (currentGrade: string): string => {
  const grades = ["F", "D-", "D", "D+", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+"];
  const currentIndex = grades.indexOf(currentGrade.trim().toUpperCase());
  if (currentIndex === -1 || currentIndex === 0) {
    return currentGrade;
  }
  return grades[currentIndex - 1];
};

// Keep the old function for backwards compatibility but mark as deprecated
export const convertToGPA = (percentage: number): number => {
  // This function is now deprecated but kept for compatibility
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
