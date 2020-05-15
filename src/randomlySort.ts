import xorshift, { Xorshift } from "xorshift";

export default function randomlySort<T>(arr: T[]): T[] {
  const prng = createPrng();

  const clone = arr.slice();
  for (let i = 0; i < 512; i++) {
    fisherYates(clone, prng);
  }
  return clone;
}

function createPrng(): Xorshift {
  return new xorshift.constructor([
    Math.random() * Math.pow(2, 32),
    Math.random() * Math.pow(2, 32),
    Math.random() * Math.pow(2, 32),
    Math.random() * Math.pow(2, 32),
  ]);
}

function fisherYates(arr: unknown[], prng: Xorshift) {
  const len = arr.length;
  for (let i = 0; i <= len - 2; i++) {
    const j = randInt(prng, i, len);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

function randInt(prng: Xorshift, inclMin: number, exclMax: number): number {
  const range = exclMax - inclMin;
  return inclMin + Math.floor(prng.random() * range);
}
