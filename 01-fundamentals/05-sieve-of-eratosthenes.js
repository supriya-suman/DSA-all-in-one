/**
 * TERM: Sieve of Eratosthenes
 * DEFINITION: An algorithm that finds all primes up to n by repeatedly crossing out multiples of each prime, in O(n log log n).
 * RELATED TERMS:
 *   - Segmented sieve: sieve applied block by block for a large range [L, R].
 *   - Smallest prime factor (SPF) sieve: stores the smallest prime dividing each number for fast factorization.
 * RUN: node 01-fundamentals/05-sieve-of-eratosthenes.js
 */

function sieve(n) { // returns all primes ≤ n
  const isPrime = new Array(n + 1).fill(true); // assume every number is prime
  isPrime[0] = isPrime[1] = false; // 0 and 1 are not prime
  for (let p = 2; p * p <= n; p++) { // only need primes up to √n
    if (!isPrime[p]) continue; // skip numbers already crossed out
    for (let m = p * p; m <= n; m += p) isPrime[m] = false; // cross out multiples starting at p²
  } // end for
  return isPrime.reduce((acc, v, i) => (v ? acc.concat(i) : acc), []); // collect indices still marked prime
} // end sieve

function spfSieve(n) { // smallest prime factor for every number ≤ n
  const spf = Array.from({ length: n + 1 }, (_, i) => i); // initially spf[i] = i
  for (let p = 2; p * p <= n; p++) { // iterate potential primes
    if (spf[p] !== p) continue; // p is not prime
    for (let m = p * p; m <= n; m += p) if (spf[m] === m) spf[m] = p; // first prime to reach m is its smallest factor
  } // end for
  return spf; // lookup table
} // end spfSieve

function factorWithSpf(x, spf) { // factorize in O(log x) using the table
  const f = []; // factors
  while (x > 1) { f.push(spf[x]); x /= spf[x]; } // keep dividing by smallest factor
  return f; // prime factors
} // end factorWithSpf

function segmentedSieve(L, R) { // primes in [L, R] using primes ≤ √R
  const base = sieve(Math.floor(Math.sqrt(R))); // small primes
  const mark = new Array(R - L + 1).fill(true); // mark[i] refers to number L+i
  for (const p of base) { // cross out multiples of each small prime
    let start = Math.max(p * p, Math.ceil(L / p) * p); // first multiple of p inside range
    for (let m = start; m <= R; m += p) mark[m - L] = false; // cross out
  } // end for
  const res = []; // primes in the segment
  for (let i = 0; i < mark.length; i++) if (mark[i] && L + i > 1) res.push(L + i); // collect survivors
  return res; // primes between L and R
} // end segmentedSieve

console.log('primes ≤ 50       =', sieve(50).join(', ')); // 2 3 5 7 ... 47
const spf = spfSieve(100); // build SPF table up to 100
console.log('factor 84 via SPF =', factorWithSpf(84, spf)); // [2,2,3,7]
console.log('primes in [90,130]=', segmentedSieve(90, 130).join(', ')); // 97 101 103 ...
