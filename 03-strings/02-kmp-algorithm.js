/**
 * TERM: KMP (Knuth-Morris-Pratt) Pattern Matching
 * DEFINITION: KMP finds all occurrences of a pattern in a text in O(n + m) by using an LPS table to avoid re-checking characters.
 * RELATED TERMS:
 *   - LPS (Longest Prefix which is also Suffix) / failure function: for each prefix of the pattern, the length of its longest proper prefix that is also a suffix.
 *   - Naive pattern matching: try every start position, O(n*m).
 * RUN: node 03-strings/02-kmp-algorithm.js
 */

function naiveSearch(text, pat) { // brute force O(n*m) for comparison
  const res = []; // match positions
  for (let i = 0; i + pat.length <= text.length; i++) { // every start index
    let j = 0; while (j < pat.length && text[i + j] === pat[j]) j++; // compare character by character
    if (j === pat.length) res.push(i); // full match
  } // end for
  return res; // positions
} // end naiveSearch

function buildLPS(pat) { // failure function
  const lps = new Array(pat.length).fill(0); // lps[0] is always 0
  let len = 0; // length of current matched prefix
  for (let i = 1; i < pat.length; ) { // compute for each position
    if (pat[i] === pat[len]) lps[i++] = ++len; // extend the border
    else if (len > 0) len = lps[len - 1]; // fall back to a shorter border
    else lps[i++] = 0; // no border at all
  } // end for
  return lps; // table
} // end buildLPS

function kmpSearch(text, pat) { // O(n + m)
  const lps = buildLPS(pat); // preprocess pattern
  const res = []; // match positions
  let j = 0; // index in pattern
  for (let i = 0; i < text.length; i++) { // index in text never moves backward
    while (j > 0 && text[i] !== pat[j]) j = lps[j - 1]; // on mismatch, reuse known border
    if (text[i] === pat[j]) j++; // characters match → advance in pattern
    if (j === pat.length) { res.push(i - j + 1); j = lps[j - 1]; } // full match, continue for overlaps
  } // end for
  return res; // positions
} // end kmpSearch

console.log('LPS("ababaca")     =', buildLPS('ababaca')); // [0,0,1,2,3,0,1]
console.log('naiveSearch        =', naiveSearch('abababab', 'abab')); // [0,2,4]
console.log('kmpSearch          =', kmpSearch('abababab', 'abab')); // [0,2,4]
console.log('kmpSearch (none)   =', kmpSearch('hello world', 'xyz')); // []
