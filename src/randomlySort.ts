export default function randomlySort<T>(arr: T[]): T[] {
  const clone = arr.slice();
  for (let i = 0; i < 256; i++) {
    clone.sort(halfPositiveHalfNegative);
  }
  return clone;
}

function halfPositiveHalfNegative(): number {
  return Math.random() - 0.5;
}
