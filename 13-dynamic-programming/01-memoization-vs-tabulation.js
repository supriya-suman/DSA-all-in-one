/**
 * TERM: Dynamic Programming (Memoization vs Tabulation)
 * DEFINITION: Dynamic Programming solves problems with overlapping subproblems and optimal substructure by storing each subproblem's answer so it is computed only once.
 * RELATED TERMS:
 *   - Overlapping subproblems: the same smaller problem is solved many times.
 *   - Optimal substructure: optimal answer is built from optimal answers of subproblems.
 *   - Memoization (top-down): recursion + cache.
 *   - Tabulation (bottom-up): fill a table iteratively from base cases.
 *   - State: the parameters that identify a subproblem.  Transition (recurrence): formula linking states.
 *   - Space optimization: keep only the last few rows/values needed.
 * RUN: node 13-dynamic-programming/01-memoization-vs-tabulation.js
 */

function fibMemo(n, memo = new Map()) { // top-down O(n)
  if (n < 2) return n; // base cases
  if (memo.has(n)) return memo.get(n); // reuse stored answer
  const val = fibMemo(n - 1, memo) + fibMemo(n - 2, memo); // recurrence
  memo.set(n, val); return val; // store before returning
} // end fibMemo

function fibTab(n) { // bottom-up O(n) time, O(n) space
  const dp = [0, 1]; // base cases
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2]; // fill table in order
  return dp[n]; // answer
} // end fibTab

function fibOptimized(n) { // O(1) space
  let a = 0, b = 1; // last two values
  for (let i = 0; i < n; i++) [a, b] = [b, a + b]; // slide the window
  return a; // F(n)
} // end fibOptimized

function climbStairs(n) { // ways to climb with steps of 1 or 2
  let one = 1, two = 1; // ways to reach step i-1 and i-2
  for (let i = 2; i <= n; i++) [two, one] = [one, one + two]; // ways(i) = ways(i-1) + ways(i-2)
  return one; // ways(n)
} // end climbStairs

function minCostClimbingStairs(cost) { // pay cost[i] to step on i
  let prev2 = 0, prev1 = 0; // min cost to reach i-2 and i-1
  for (let i = 2; i <= cost.length; i++) [prev2, prev1] = [prev1, Math.min(prev1 + cost[i - 1], prev2 + cost[i - 2])]; // choose cheaper previous step
  return prev1; // cost to reach the top
} // end minCostClimbingStairs

console.log('fibMemo(50)           =', fibMemo(50)); // 12586269025
console.log('fibTab(50)            =', fibTab(50)); // same
console.log('fibOptimized(50)      =', fibOptimized(50)); // same
console.log('climbStairs(5)        =', climbStairs(5)); // 8
console.log('minCostClimbingStairs =', minCostClimbingStairs([10, 15, 20])); // 15
