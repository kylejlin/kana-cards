const halfPositiveHalfNegative = () => Math.random() - 0.5;

export default (arr) => {
  const clone = arr.slice();
  for (let i = 0; i < 256; i++) {
    clone.sort(halfPositiveHalfNegative);
  }
  return clone;
};
