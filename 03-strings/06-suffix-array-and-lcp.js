/**
 * TERM: Suffix Array & LCP Array
 * DEFINITION: A suffix array lists the starting indices of all suffixes of a string in sorted order; the LCP array stores the longest common prefix of each adjacent pair, enabling fast substring queries.
 * RELATED TERMS:
 *   - Suffix: substring that runs to the end of the string.
 *   - Kasai's algorithm: builds LCP in O(n) from the suffix array.
 *   - Prefix doubling: sorts suffixes by first 1, 2, 4, … characters → O(n log² n).
 *   - Suffix tree / Suffix automaton: more powerful (and complex) relatives.
 *   - Distinct substrings = n(n+1)/2 − sum(LCP).
 * RUN: node 03-strings/06-suffix-array-and-lcp.js
 */

function buildSuffixArray(s) { // prefix doubling
  const n = s.length; let sa = [...Array(n).keys()], rank = [...s].map(c => c.charCodeAt(0)), tmp = new Array(n); // start ranks = char codes
  for (let k = 1; ; k <<= 1) { // compare by first 2k characters
    const key = (i) => [rank[i], i + k < n ? rank[i + k] : -1]; // pair (rank of first half, rank of second half)
    sa.sort((a, b) => { const [a1, a2] = key(a), [b1, b2] = key(b); return a1 - b1 || a2 - b2; }); // sort by pairs
    tmp[sa[0]] = 0; // first suffix gets rank 0
    for (let i = 1; i < n; i++) { const [p1, p2] = key(sa[i - 1]), [c1, c2] = key(sa[i]); tmp[sa[i]] = tmp[sa[i - 1]] + (p1 !== c1 || p2 !== c2 ? 1 : 0); } // new rank if pair differs
    rank = [...tmp]; // update ranks
    if (rank[sa[n - 1]] === n - 1) break; // all ranks distinct → fully sorted
  } // end for
  return sa; // suffix array
} // end buildSuffixArray

function kasaiLCP(s, sa) { // lcp[i] = LCP(suffix sa[i], suffix sa[i-1])
  const n = s.length, rank = new Array(n), lcp = new Array(n).fill(0); let h = 0; // inverse SA and current match length
  sa.forEach((p, i) => (rank[p] = i)); // rank[position] = index in SA
  for (let i = 0; i < n; i++) { // process suffixes in text order
    if (rank[i] > 0) { const j = sa[rank[i] - 1]; while (s[i + h] === s[j + h]) h++; lcp[rank[i]] = h; if (h > 0) h--; } // extend match, then it can drop by at most 1
    else h = 0; // first suffix in SA has no predecessor
  } // end for
  return lcp; // LCP array
} // end kasaiLCP

const s = 'banana'; // sample string
const sa = buildSuffixArray(s); // build SA
const lcp = kasaiLCP(s, sa); // build LCP
console.log('suffix array =', sa); // [5,3,1,0,4,2]
sa.forEach((p, i) => console.log(`   ${p}: ${s.slice(p).padEnd(7)} lcp=${lcp[i]}`)); // show sorted suffixes
console.log('distinct substrings =', (s.length * (s.length + 1)) / 2 - lcp.reduce((a, b) => a + b, 0)); // 15
console.log('longest repeated substring =', s.substr(sa[lcp.indexOf(Math.max(...lcp))], Math.max(...lcp))); // ana
