/**
 * TERM: Rabin-Karp & Rolling Hash
 * DEFINITION: Rabin-Karp finds a pattern by comparing hash values of text windows, updating each window's hash in O(1) with a rolling hash.
 * RELATED TERMS:
 *   - Polynomial hash: hash = s[0]*B^(m-1) + ... + s[m-1] (mod M).
 *   - Hash collision: two different strings with the same hash, so we verify characters on a hash match.
 *   - Spurious hit: a collision found during Rabin-Karp.
 * RUN: node 03-strings/03-rabin-karp-rolling-hash.js
 */

function rabinKarp(text, pat) { // average O(n + m), worst O(n*m)
  const B = 256, M = 1_000_000_007; // base and large prime modulus
  const n = text.length, m = pat.length; // lengths
  if (m > n) return []; // pattern longer than text
  let high = 1; // B^(m-1) % M, weight of the leading character
  for (let i = 0; i < m - 1; i++) high = (high * B) % M; // compute it
  let hp = 0, ht = 0; // hashes of pattern and current window
  for (let i = 0; i < m; i++) { // hash first m characters
    hp = (hp * B + pat.charCodeAt(i)) % M; // pattern hash
    ht = (ht * B + text.charCodeAt(i)) % M; // first window hash
  } // end for
  const res = []; // match positions
  for (let i = 0; i + m <= n; i++) { // every window
    if (hp === ht && text.substr(i, m) === pat) res.push(i); // hash match → verify to rule out collision
    if (i + m < n) { // roll to the next window
      ht = (ht - text.charCodeAt(i) * high % M + M) % M; // remove outgoing char
      ht = (ht * B + text.charCodeAt(i + m)) % M; // shift and add incoming char
    } // end if
  } // end for
  return res; // positions
} // end rabinKarp

function countDistinctSubstringsOfLength(s, k) { // rolling hash use case
  const seen = new Set(); // set of window hashes
  const B = 131, M = 1e9 + 9; // base and modulus
  let h = 0, high = 1; // window hash and B^(k-1)
  for (let i = 0; i < k - 1; i++) high = (high * B) % M; // leading weight
  for (let i = 0; i < s.length; i++) { // slide over s
    if (i >= k) h = (h - s.charCodeAt(i - k) * high % M + M) % M; // remove char leaving window
    h = (h * B + s.charCodeAt(i)) % M; // add new char
    if (i >= k - 1) seen.add(h); // full window → store hash
  } // end for
  return seen.size; // number of distinct windows (probabilistic)
} // end countDistinctSubstringsOfLength

console.log('rabinKarp              =', rabinKarp('GEEKS FOR GEEKS', 'GEEK')); // [0,10]
console.log('distinct length-2 subs =', countDistinctSubstringsOfLength('abab', 2)); // ab, ba → 2
