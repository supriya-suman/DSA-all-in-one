/**
 * TERM: Longest Common Subsequence (LCS) & Edit Distance
 * DEFINITION: LCS is the longest sequence appearing in order in both strings; Edit (Levenshtein) distance is the minimum inserts, deletes and replaces to turn one string into another; both O(n*m) 2D DP.
 * RELATED TERMS:
 *   - Longest common substring: contiguous version (reset to 0 on mismatch).
 *   - Longest palindromic subsequence = LCS(s, reverse(s)).
 *   - Shortest common supersequence length = n + m - LCS.
 * RUN: node 13-dynamic-programming/05-lcs-and-edit-distance.js
 */

function lcs(a, b) { // returns length and one LCS string
  const n = a.length, m = b.length, dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0)); // dp[i][j] for prefixes
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]); // match extends, else drop one char
  let i = n, j = m, s = ''; // rebuild string
  while (i && j) { if (a[i - 1] === b[j - 1]) { s = a[i - 1] + s; i--; j--; } else if (dp[i - 1][j] >= dp[i][j - 1]) i--; else j--; } // walk back
  return { length: dp[n][m], lcs: s }; // result
} // end lcs

function longestCommonSubstring(a, b) { // contiguous match
  let best = 0, end = 0; const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0)); // table
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) if (a[i - 1] === b[j - 1]) { dp[i][j] = dp[i - 1][j - 1] + 1; if (dp[i][j] > best) { best = dp[i][j]; end = i; } } // extend diagonal
  return a.slice(end - best, end); // substring
} // end longestCommonSubstring

function editDistance(a, b) { // Levenshtein distance
  const dp = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))); // converting to/from empty string
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]); // delete, insert, replace
  return dp[a.length][b.length]; // min operations
} // end editDistance

const longestPalindromicSubsequence = (s) => lcs(s, [...s].reverse().join('')).length; // LCS with its reverse
const shortestCommonSupersequence = (a, b) => a.length + b.length - lcs(a, b).length; // share the LCS once

console.log('lcs                 =', lcs('ABCBDAB', 'BDCABA')); // length 4
console.log('longestCommonSubstr =', longestCommonSubstring('GeeksforGeeks', 'GeeksQuiz')); // Geeks
console.log('editDistance        =', editDistance('horse', 'ros')); // 3
console.log('longestPalSubseq    =', longestPalindromicSubsequence('bbbab')); // 4
console.log('shortestSuperseq    =', shortestCommonSupersequence('abac', 'cab')); // 5
