/**
 * TERM: Interval DP (Matrix Chain Multiplication, Palindrome Partitioning, Burst Balloons)
 * DEFINITION: Interval DP solves problems on a range [i, j] by trying every split point k and combining answers of the smaller ranges, usually O(n³).
 * RELATED TERMS:
 *   - Process ranges by increasing length so smaller ranges are ready first.
 *   - Matrix chain multiplication (MCM): best parenthesization to minimize scalar multiplications.
 * RUN: node 13-dynamic-programming/08-interval-dp.js
 */

function matrixChain(dims) { // matrix i has size dims[i-1] x dims[i]
  const n = dims.length - 1, dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0)); // dp[i][j] = cost to multiply i..j
  for (let len = 2; len <= n; len++) for (let i = 1; i + len - 1 <= n; i++) { // ranges by length
    const j = i + len - 1; dp[i][j] = Infinity; // end of range
    for (let k = i; k < j; k++) dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j] + dims[i - 1] * dims[k] * dims[j]); // split after k
  } // end loops
  return dp[1][n]; // whole chain
} // end matrixChain

function minPalindromeCuts(s) { // fewest cuts so every piece is a palindrome
  const n = s.length, isPal = Array.from({ length: n }, () => new Array(n).fill(false)); // palindrome table
  for (let len = 1; len <= n; len++) for (let i = 0; i + len - 1 < n; i++) { const j = i + len - 1; isPal[i][j] = s[i] === s[j] && (len <= 2 || isPal[i + 1][j - 1]); } // ends match and inside is palindrome
  const cuts = new Array(n).fill(0); // cuts[i] = min cuts for s[0..i]
  for (let i = 0; i < n; i++) { if (isPal[0][i]) continue; cuts[i] = i; for (let j = 1; j <= i; j++) if (isPal[j][i]) cuts[i] = Math.min(cuts[i], cuts[j - 1] + 1); } // last piece s[j..i]
  return cuts[n - 1]; // answer
} // end minPalindromeCuts

function burstBalloons(nums) { // choose the LAST balloon to burst in each range
  const a = [1, ...nums, 1], n = a.length, dp = Array.from({ length: n }, () => new Array(n).fill(0)); // padded with 1s
  for (let len = 2; len < n; len++) for (let l = 0; l + len < n; l++) { const r = l + len; for (let k = l + 1; k < r; k++) dp[l][r] = Math.max(dp[l][r], dp[l][k] + dp[k][r] + a[l] * a[k] * a[r]); } // k burst last between l and r
  return dp[0][n - 1]; // max coins
} // end burstBalloons

console.log('matrixChain([40,20,30,10,30]) =', matrixChain([40, 20, 30, 10, 30])); // 26000
console.log('minPalindromeCuts("aab")      =', minPalindromeCuts('aab')); // 1
console.log('burstBalloons([3,1,5,8])      =', burstBalloons([3, 1, 5, 8])); // 167
