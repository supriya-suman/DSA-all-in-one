/**
 * TERM: Bitmask DP (Travelling Salesman Problem)
 * DEFINITION: Bitmask DP uses an integer's bits to represent which items are already used, e.g. TSP finds the cheapest tour visiting every city once in O(2^n · n²).
 * RELATED TERMS:
 *   - TSP: Travelling Salesman Problem (NP-hard).
 *   - Hamiltonian cycle: cycle visiting every vertex exactly once.
 *   - State dp[mask][i]: min cost having visited set "mask" and currently at city i.
 * RUN: node 13-dynamic-programming/09-bitmask-dp-tsp.js
 */

function tsp(dist) { // dist[i][j] = cost from i to j, start at city 0
  const n = dist.length, FULL = (1 << n) - 1; // number of cities and all-visited mask
  const dp = Array.from({ length: 1 << n }, () => new Array(n).fill(Infinity)); // dp[mask][i]
  dp[1][0] = 0; // only city 0 visited, standing at 0
  for (let mask = 1; mask <= FULL; mask++) for (let i = 0; i < n; i++) { // every state
    if (!(mask & (1 << i)) || dp[mask][i] === Infinity) continue; // invalid or unreachable state
    for (let j = 0; j < n; j++) if (!(mask & (1 << j))) { const nm = mask | (1 << j); dp[nm][j] = Math.min(dp[nm][j], dp[mask][i] + dist[i][j]); } // go to an unvisited city j
  } // end loops
  return Math.min(...dp[FULL].map((c, i) => c + dist[i][0])); // return to start city
} // end tsp

function canPartitionKSubsets(nums, k) { // bitmask DP: split into k equal-sum groups
  const total = nums.reduce((a, b) => a + b, 0); if (total % k) return false; const target = total / k; // each group sum
  const dp = new Array(1 << nums.length).fill(-1); dp[0] = 0; // dp[mask] = current group fill, -1 = unreachable
  for (let mask = 0; mask < 1 << nums.length; mask++) { if (dp[mask] < 0) continue; for (let i = 0; i < nums.length; i++) { const nm = mask | (1 << i); if (nm !== mask && dp[nm] < 0 && dp[mask] + nums[i] <= target) dp[nm] = (dp[mask] + nums[i]) % target; } } // add element i to current group
  return dp[(1 << nums.length) - 1] === 0; // all used and last group complete
} // end canPartitionKSubsets

const dist = [[0, 10, 15, 20], [10, 0, 35, 25], [15, 35, 0, 30], [20, 25, 30, 0]]; // 4 cities
console.log('TSP minimum tour        =', tsp(dist)); // 80
console.log('canPartitionKSubsets(4) =', canPartitionKSubsets([4, 3, 2, 3, 5, 2, 1], 4)); // true
