/**
 * TERM: Z-Algorithm
 * DEFINITION: The Z-algorithm builds an array where Z[i] is the length of the longest substring starting at i that matches a prefix of the string, in O(n).
 * RELATED TERMS:
 *   - Z-box: the window [L, R] that matches the prefix and is used to skip work.
 *   - Pattern search with Z: run on pattern + '$' + text and look for Z[i] = pattern length.
 * RUN: node 03-strings/04-z-algorithm.js
 */

function zArray(s) { // O(n)
  const n = s.length, z = new Array(n).fill(0); // Z values
  let L = 0, R = 0; // current Z-box [L, R)
  for (let i = 1; i < n; i++) { // Z[0] is left as 0 by convention
    if (i < R) z[i] = Math.min(R - i, z[i - L]); // reuse info from inside the Z-box
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) z[i]++; // extend match naively
    if (i + z[i] > R) { L = i; R = i + z[i]; } // move Z-box further right
  } // end for
  return z; // Z array
} // end zArray

function zSearch(text, pat) { // find pattern using Z array
  const combined = pat + '$' + text; // '$' must not appear in either string
  const z = zArray(combined); // compute Z values
  const res = []; // matches
  for (let i = pat.length + 1; i < combined.length; i++) if (z[i] === pat.length) res.push(i - pat.length - 1); // full prefix match
  return res; // positions in text
} // end zSearch

console.log('zArray("aabxaab") =', zArray('aabxaab')); // [0,1,0,0,3,1,0]
console.log('zSearch           =', zSearch('baabaa', 'aab')); // [1]
