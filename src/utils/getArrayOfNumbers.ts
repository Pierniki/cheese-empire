export const getArrayOfNumbers = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (val, i) => i + from);
