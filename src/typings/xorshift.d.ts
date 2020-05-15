declare module "xorshift" {
  export interface Xorshift {
    constructor: XorshiftConstructor;

    random(): number;
    randomint(): [number, number];
  }

  export interface XorshiftConstructor {
    new (seed: [number, number, number, number]);
  }

  const xorshift: Xorshift;

  export default xorshift;
}
