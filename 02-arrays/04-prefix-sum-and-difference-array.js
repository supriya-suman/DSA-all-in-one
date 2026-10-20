/**
 * TERM: Prefix Sum & Difference Array
 * DEFINITION: A prefix sum array stores running totals so any range sum is O(1); a difference array makes range updates O(1).
 * RELATED TERMS:
 *   - 2D prefix sum: running totals of a matrix for O(1) sub-rectangle sums.
 *   - Subarray sum equals K: prefix sums + hash map counting.
 * RUN: node 02-arrays/04-prefix-sum-and-difference-array.js
 */

function buildPrefix(arr) { // prefix[i] = sum of arr[0..i-1]
  const prefix = [0]; // prefix[0] = 0 makes formulas clean
  for (const x of arr) prefix.push(prefix[prefix.length - 1] + x); // add each element to previous total
  return prefix; // length n+1
} // end buildPrefix

const rangeSum = (prefix, l, r) => prefix[r + 1] - prefix[l]; // sum of arr[l..r] in O(1)

function subarraySumEqualsK(nums, k) { // count subarrays summing to k, O(n)
  const seen = new Map([[0, 1]]); // prefix sum 0 seen once (empty prefix)
  let sum = 0, count = 0; // running prefix sum and answer
  for (const x of nums) { // go through array
    sum += x; // extend prefix
    count += seen.get(sum - k) || 0; // earlier prefix with value sum-k ends a valid subarray here
    seen.set(sum, (seen.get(sum) || 0) + 1); // record this prefix
  } // end for
  return count; // number of subarrays
} // end subarraySumEqualsK

function rangeAddWithDifference(n, updates) { // apply many [l, r, val] adds in O(n + q)
  const diff = new Array(n + 1).fill(0); // difference array
  for (const [l, r, v] of updates) { diff[l] += v; diff[r + 1] -= v; } // mark start and end+1
  const res = []; let run = 0; // rebuild with running sum
  for (let i = 0; i < n; i++) { run += diff[i]; res.push(run); } // prefix sum of diff gives values
  return res; // final array
} // end rangeAddWithDifference

function prefix2D(m) { // P[i][j] = sum of rectangle (0,0)-(i-1,j-1)
  const R = m.length, C = m[0].length; // dimensions
  const P = Array.from({ length: R + 1 }, () => new Array(C + 1).fill(0)); // padded table
  for (let i = 1; i <= R; i++) for (let j = 1; j <= C; j++) P[i][j] = m[i - 1][j - 1] + P[i - 1][j] + P[i][j - 1] - P[i - 1][j - 1]; // inclusion-exclusion
  return P; // table
} // end prefix2D
const rectSum = (P, r1, c1, r2, c2) => P[r2 + 1][c2 + 1] - P[r1][c2 + 1] - P[r2 + 1][c1] + P[r1][c1]; // O(1) rectangle sum

const p = buildPrefix([3, 1, 4, 1, 5, 9]); // build once O(n)
console.log('prefix array          =', p); // [0,3,4,8,9,14,23]
console.log('rangeSum(1,3)         =', rangeSum(p, 1, 3)); // 1+4+1 = 6
console.log('subarraySumEqualsK(2) =', subarraySumEqualsK([1, 1, 1], 2)); // 2
console.log('difference array adds =', rangeAddWithDifference(5, [[1, 3, 2], [2, 4, 3]])); // [0,2,5,5,3]
const P = prefix2D([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); // 3x3 matrix
console.log('2D rectSum(1,1,2,2)   =', rectSum(P, 1, 1, 2, 2)); // 5+6+8+9 = 28
