/**
 * TERM: Modular Arithmetic & Fast (Binary) Exponentiation
 * DEFINITION: Binary exponentiation computes a^b (mod m) in O(log b) by squaring the base and using the binary digits of b.
 * RELATED TERMS:
 *   - Modulo (%): remainder after division; used to keep numbers small (commonly 1e9+7).
 *   - Fermat's little theorem: if p is prime, a^(p-1) ≡ 1 (mod p), so inverse of a is a^(p-2).
 *   - nCr mod p: combinations using factorials and modular inverse.
 * RUN: node 01-fundamentals/06-modular-exponentiation.js
 */

const MOD = 1_000_000_007n; // common prime modulus, BigInt to avoid overflow

function modPow(base, exp, mod = MOD) { // computes base^exp % mod
  base = BigInt(base) % mod; // reduce base first
  exp = BigInt(exp); // ensure BigInt exponent
  let result = 1n; // multiplicative identity
  while (exp > 0n) { // process each bit of exp
    if (exp & 1n) result = (result * base) % mod; // if current bit is 1 multiply it in
    base = (base * base) % mod; // square base for next bit
    exp >>= 1n; // move to next bit
  } // end while
  return result; // final answer
} // end modPow

const modInverseFermat = (a, p = MOD) => modPow(a, p - 2n, p); // a^(p-2) is inverse when p is prime

function nCrMod(n, r, p = MOD) { // combinations n choose r modulo prime p
  if (r < 0 || r > n) return 0n; // invalid r
  let num = 1n, den = 1n; // numerator and denominator products
  for (let i = 0; i < r; i++) { // multiply r terms
    num = (num * BigInt(n - i)) % p; // n*(n-1)*...*(n-r+1)
    den = (den * BigInt(i + 1)) % p; // r!
  } // end for
  return (num * modInverseFermat(den, p)) % p; // divide by multiplying with inverse
} // end nCrMod

console.log('2^10 mod 1e9+7      =', modPow(2, 10).toString()); // 1024
console.log('3^200 mod 1e9+7     =', modPow(3, 200).toString()); // large power quickly
console.log('inverse of 2        =', modInverseFermat(2n).toString()); // 500000004
console.log('C(10,3) mod 1e9+7   =', nCrMod(10, 3).toString()); // 120
console.log('(-7) % 3 in JS      =', -7 % 3, '→ fixed:', ((-7 % 3) + 3) % 3); // handle negative mod
