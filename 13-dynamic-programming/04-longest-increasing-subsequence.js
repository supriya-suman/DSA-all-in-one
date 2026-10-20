/**
 * TERM: Longest Increasing Subsequence (LIS)
 * DEFINITION: LIS is the longest subsequence whose elements strictly increase; O(n²) DP or O(n log n) using binary search on "tails" (patience sorting).
 * RELATED TERMS:
 *   - tails[k]: smallest possible tail of an increasing subsequence of length k+1.
 *   - Variants: longest bitonic subsequence, Russian doll envelopes, number of LIS.
 * RUN: node 13-dynamic-programming/04-longest-increasing-subsequence.js
 */

function lisQuadratic(nums) { // dp[i] = LIS ending at i
  const dp = new Array(nums.length).fill(1), prev = new Array(nums.length).fill(-1); // lengths and back pointers
  for (let i = 0; i < nums.length; i++) for (let j = 0; j < i; j++) if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) { dp[i] = dp[j] + 1; prev[i] = j; } // extend a shorter sequence
  let end = dp.indexOf(Math.max(...dp)); const seq = []; // index where best LIS ends
  while (end !== -1) { seq.push(nums[end]); end = prev[end]; } // follow back pointers
  return { length: seq.length, sequence: seq.reverse() }; // result
} // end lisQuadratic

function lisNLogN(nums) { // patience sorting
  const tails = []; // tails[k] = smallest tail for length k+1
  for (const x of nums) { // process each number
    let lo = 0, hi = tails.length; // binary search first tail ≥ x
    while (lo < hi) { const mid = (lo + hi) >> 1; if (tails[mid] < x) lo = mid + 1; else hi = mid; } // lower bound
    tails[lo] = x; // extend (lo === length) or improve an existing tail
  } // end for
  return tails.length; // LIS length
} // end lisNLogN

function longestBitonic(nums) { // increases then decreases
  const n = nums.length, inc = new Array(n).fill(1), dec = new Array(n).fill(1); // LIS ending at i and LDS starting at i
  for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) if (nums[j] < nums[i]) inc[i] = Math.max(inc[i], inc[j] + 1); // left side
  for (let i = n - 1; i >= 0; i--) for (let j = n - 1; j > i; j--) if (nums[j] < nums[i]) dec[i] = Math.max(dec[i], dec[j] + 1); // right side
  return Math.max(...inc.map((v, i) => v + dec[i] - 1)); // peak counted once
} // end longestBitonic

console.log('lisQuadratic   =', lisQuadratic([10, 9, 2, 5, 3, 7, 101, 18])); // length 4, e.g. [2,5,7,101]
console.log('lisNLogN       =', lisNLogN([10, 9, 2, 5, 3, 7, 101, 18])); // 4
console.log('longestBitonic =', longestBitonic([1, 11, 2, 10, 4, 5, 2, 1])); // 6
