/**
 * TERM: GCD, LCM & Euclidean Algorithm
 * DEFINITION: GCD is the largest number dividing two numbers; the Euclidean algorithm finds it by repeated remainders, and LCM = a*b/GCD.
 * RELATED TERMS:
 *   - Extended Euclidean algorithm: also finds x, y such that a*x + b*y = gcd(a, b).
 *   - Modular inverse: number x such that (a*x) % m = 1 (exists when gcd(a, m) = 1).
 * RUN: node 01-fundamentals/04-math-gcd-lcm.js
 */

function gcd(a, b) { // Euclid: gcd(a,b) = gcd(b, a % b)
  while (b !== 0) { // stop when the remainder becomes 0
    [a, b] = [b, a % b]; // replace pair with (b, remainder)
  } // end while
  return Math.abs(a); // the last non-zero value is the gcd
} // end gcd

const lcm = (a, b) => Math.abs(a / gcd(a, b) * b); // divide first to avoid overflow

function extendedGcd(a, b) { // returns [g, x, y] with a*x + b*y = g
  if (b === 0) return [a, 1, 0]; // base case: a*1 + 0*0 = a
  const [g, x1, y1] = extendedGcd(b, a % b); // solve the smaller problem
  return [g, y1, x1 - Math.floor(a / b) * y1]; // back-substitute coefficients
} // end extendedGcd

function modInverse(a, m) { // inverse of a modulo m
  const [g, x] = extendedGcd(a, m); // need x from a*x + m*y = 1
  if (g !== 1) return null; // inverse exists only if gcd is 1
  return ((x % m) + m) % m; // normalize x to the range [0, m)
} // end modInverse

function isPrime(n) { // trial division up to sqrt(n): O(√n)
  if (n < 2) return false; // 0 and 1 are not prime
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; // found a divisor
  return true; // no divisor found
} // end isPrime

function primeFactors(n) { // prime factorization in O(√n)
  const f = []; // collected factors
  for (let p = 2; p * p <= n; p++) { // try each candidate p
    while (n % p === 0) { f.push(p); n /= p; } // divide out p as many times as possible
  } // end for
  if (n > 1) f.push(n); // leftover is itself prime
  return f; // list of prime factors
} // end primeFactors

console.log('gcd(48,18)        =', gcd(48, 18)); // 6
console.log('lcm(4,6)          =', lcm(4, 6)); // 12
console.log('extendedGcd(30,12)=', extendedGcd(30, 12)); // [6, 1, -2]
console.log('modInverse(3,11)  =', modInverse(3, 11)); // 4 because 3*4=12≡1 mod 11
console.log('isPrime(97)       =', isPrime(97)); // true
console.log('primeFactors(360) =', primeFactors(360)); // [2,2,2,3,3,5]
