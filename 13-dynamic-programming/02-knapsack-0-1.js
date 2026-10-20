/**
 * TERM: 0/1 Knapsack (and Subset Sum / Partition)
 * DEFINITION: Given items with weights and values and a capacity, choose each item at most once to maximize total value; solved by DP in O(n * W).
 * RELATED TERMS:
 *   - Pseudo-polynomial time: depends on the numeric value W, not just input size.
 *   - Subset sum: can some subset reach exactly target?  Partition equal subset sum: split into two equal halves.
 *   - 1D optimization: iterate capacity backwards so each item is used once.
 * RUN: node 13-dynamic-programming/02-knapsack-0-1.js
 */

function knapsack2D(wt, val, W) { // dp[i][w] = best value using first i items with capacity w
  const n = wt.length, dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0)); // table of zeros
  for (let i = 1; i <= n; i++) for (let w = 0; w <= W; w++) { // each item and capacity
    dp[i][w] = dp[i - 1][w]; // option 1: skip item i
    if (wt[i - 1] <= w) dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - wt[i - 1]] + val[i - 1]); // option 2: take item i
  } // end loops
  const chosen = []; for (let i = n, w = W; i > 0; i--) if (dp[i][w] !== dp[i - 1][w]) { chosen.push(i - 1); w -= wt[i - 1]; } // backtrack chosen items
  return { best: dp[n][W], chosen: chosen.reverse() }; // value and items
} // end knapsack2D

function knapsack1D(wt, val, W) { // O(W) space
  const dp = new Array(W + 1).fill(0); // dp[w] = best value with capacity w
  for (let i = 0; i < wt.length; i++) for (let w = W; w >= wt[i]; w--) dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]); // backwards so item i is used once
  return dp[W]; // answer
} // end knapsack1D

function subsetSum(nums, target) { // boolean DP
  const dp = new Array(target + 1).fill(false); dp[0] = true; // empty subset makes 0
  for (const x of nums) for (let s = target; s >= x; s--) dp[s] = dp[s] || dp[s - x]; // reach s with or without x
  return dp[target]; // reachable?
} // end subsetSum

function canPartition(nums) { // equal subset sum partition
  const total = nums.reduce((a, b) => a + b, 0); // sum of all numbers
  return total % 2 === 0 && subsetSum(nums, total / 2); // need half the total
} // end canPartition

function countSubsetsWithSum(nums, target) { // number of subsets reaching target
  const dp = new Array(target + 1).fill(0); dp[0] = 1; // one way to make 0
  for (const x of nums) for (let s = target; s >= x; s--) dp[s] += dp[s - x]; // add ways that use x
  return dp[target]; // count
} // end countSubsetsWithSum

console.log('knapsack2D          =', knapsack2D([1, 3, 4, 5], [1, 4, 5, 7], 7)); // best 9 with items [1,2]
console.log('knapsack1D          =', knapsack1D([1, 3, 4, 5], [1, 4, 5, 7], 7)); // 9
console.log('subsetSum(9)        =', subsetSum([3, 34, 4, 12, 5, 2], 9)); // true
console.log('canPartition        =', canPartition([1, 5, 11, 5])); // true
console.log('countSubsetsWithSum =', countSubsetsWithSum([1, 2, 3, 3], 6)); // 3
