/** Exact fraction arithmetic for linear algebra calculations without float drift */
export class Frac {
  readonly n: number; // numerator
  readonly d: number; // denominator (always > 0)

  constructor(n: number | Frac, d = 1) {
    if (n instanceof Frac) {
      this.n = n.n;
      this.d = n.d;
      return;
    }
    if (d === 0) throw new Error('Division by zero');
    if (!Number.isFinite(n) || !Number.isFinite(d)) throw new Error('Non-finite fraction');

    // Handle floats by converting up to 4 decimals if needed
    if (!Number.isInteger(n) || !Number.isInteger(d)) {
      const scale = 10000;
      n = Math.round(n * scale);
      d = Math.round(d * scale);
    }

    if (d < 0) {
      n = -n;
      d = -d;
    }

    const g = Frac.gcd(Math.abs(n), d);
    this.n = n / g;
    this.d = d / g;
  }

  static gcd(a: number, b: number): number {
    a = Math.round(Math.abs(a));
    b = Math.round(Math.abs(b));
    while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a || 1;
  }

  static ZERO = new Frac(0, 1);
  static ONE = new Frac(1, 1);

  static from(v: number | Frac | string): Frac {
    if (v instanceof Frac) return v;
    if (typeof v === 'string') {
      const s = v.trim();
      if (s.includes('/')) {
        const [a, b] = s.split('/');
        return new Frac(Number(a), Number(b));
      }
      return new Frac(Number(s));
    }
    return new Frac(v);
  }

  isZero(): boolean {
    return this.n === 0;
  }

  isOne(): boolean {
    return this.n === 1 && this.d === 1;
  }

  add(other: Frac | number): Frac {
    const o = Frac.from(other);
    return new Frac(this.n * o.d + o.n * this.d, this.d * o.d);
  }

  sub(other: Frac | number): Frac {
    const o = Frac.from(other);
    return new Frac(this.n * o.d - o.n * this.d, this.d * o.d);
  }

  mul(other: Frac | number): Frac {
    const o = Frac.from(other);
    return new Frac(this.n * o.n, this.d * o.d);
  }

  div(other: Frac | number): Frac {
    const o = Frac.from(other);
    if (o.n === 0) throw new Error('Division by zero');
    return new Frac(this.n * o.d, this.d * o.n);
  }

  neg(): Frac {
    return new Frac(-this.n, this.d);
  }

  abs(): Frac {
    return new Frac(Math.abs(this.n), this.d);
  }

  inv(): Frac {
    if (this.n === 0) throw new Error('Cannot invert zero');
    return new Frac(this.d, this.n);
  }

  equals(other: Frac | number): boolean {
    const o = Frac.from(other);
    return this.n === o.n && this.d === o.d;
  }

  toNumber(): number {
    return this.n / this.d;
  }

  toTex(): string {
    if (this.d === 1) return `${this.n}`;
    if (this.n < 0) return `-\\frac{${-this.n}}{${this.d}}`;
    return `\\frac{${this.n}}{${this.d}}`;
  }

  toString(): string {
    if (this.d === 1) return `${this.n}`;
    return `${this.n}/${this.d}`;
  }
}
