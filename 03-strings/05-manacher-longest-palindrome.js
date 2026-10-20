/**
 * TERM: Longest Palindromic Substring (Expand-Around-Center & Manacher's Algorithm)
 * DEFINITION: Manacher's algorithm finds the longest palindromic substring in O(n) by reusing mirrored palindrome radii; expand-around-center does it in O(n^2).
 * RELATED TERMS:
 *   - Palindromic radius: how far a palindrome extends from its center.
 *   - Odd/even palindromes: centered on a character or between two characters.
 * RUN: node 03-strings/05-manacher-longest-palindrome.js
 */

function expandAroundCenter(s) { // O(n^2) simple approach
  let start = 0, maxLen = 0; // best palindrome
  const expand = (l, r) => { while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; } return [l + 1, r - l - 1]; }; // grow while ends match
  for (let i = 0; i < s.length; i++) { // try each center
    for (const [st, len] of [expand(i, i), expand(i, i + 1)]) { // odd and even centers
      if (len > maxLen) { maxLen = len; start = st; } // keep the longest
    } // end inner for
  } // end for
  return s.substr(start, maxLen); // longest palindrome
} // end expandAroundCenter

function manacher(s) { // O(n)
  const t = '^#' + s.split('').join('#') + '#$'; // insert separators so all palindromes are odd; ^ and $ are sentinels
  const p = new Array(t.length).fill(0); // p[i] = radius around i in t
  let center = 0, right = 0; // rightmost palindrome seen so far
  for (let i = 1; i < t.length - 1; i++) { // skip sentinels
    const mirror = 2 * center - i; // mirrored position around center
    if (i < right) p[i] = Math.min(right - i, p[mirror]); // reuse mirror's radius safely
    while (t[i + p[i] + 1] === t[i - p[i] - 1]) p[i]++; // expand beyond known radius
    if (i + p[i] > right) { center = i; right = i + p[i]; } // update rightmost palindrome
  } // end for
  let maxLen = 0, centerIdx = 0; // find maximum radius
  for (let i = 1; i < t.length - 1; i++) if (p[i] > maxLen) { maxLen = p[i]; centerIdx = i; } // best center
  const start = (centerIdx - maxLen) / 2; // convert back to index in s
  return s.substr(start, maxLen); // radius in t equals length in s
} // end manacher

console.log('expandAroundCenter =', expandAroundCenter('babad')); // bab
console.log('manacher           =', manacher('forgeeksskeegfor')); // geeksskeeg
