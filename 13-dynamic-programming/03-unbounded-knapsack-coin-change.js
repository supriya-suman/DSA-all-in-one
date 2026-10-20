/**
 * TERM: Unbounded Knapsack (Coin Change, Rod Cutting)
 * DEFINITION: Like 0/1 knapsack but each item can be used unlimited times; iterate capacity forwards so an item can be reused.
 * RELATED TERMS:
 *   - Coin change (minimum coins), Coin change II (number of ways), Rod cutting (max price).
 *   - Combinations vs permutations: loop coins outside for combinations, amount outside for permutations.
 * RUN: node 13-dynamic-programming/03-unbounded-knapsack-coin-change.js
 */

function minCoins(coins, amount) { // fewest coins to make amount
  const dp = new Array(amount + 1).fill(Infinity); dp[0] = 0; // 0 coins for amount 0
  for (let a = 1; a <= amount; a++) for (const c of coins) if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1); // use coin c last
  return dp[amount] === Infinity ? -1 : dp[amount]; // -1 if impossible
} // end minCoins

function coinCombinations(coins, amount) { // number of combinations (order doesn't matter)
  const dp = new Array(amount + 1).fill(0); dp[0] = 1; // one way to make 0
  for (const c of coins) for (let a = c; a <= amount; a++) dp[a] += dp[a - c]; // coin loop outside → each combination counted once
  return dp[amount]; // ways
} // end coinCombinations

function coinPermutations(coins, amount) { // ordered sequences (combination sum IV)
  const dp = new Array(amount + 1).fill(0); dp[0] = 1; // base
  for (let a = 1; a <= amount; a++) for (const c of coins) if (c <= a) dp[a] += dp[a - c]; // amount loop outside → orders counted separately
  return dp[amount]; // ordered ways
} // end coinPermutations

function rodCutting(prices, n) { // prices[i] = price of piece of length i+1
  const dp = new Array(n + 1).fill(0); // dp[len] = best revenue
  for (let len = 1; len <= n; len++) for (let cut = 1; cut <= len; cut++) dp[len] = Math.max(dp[len], prices[cut - 1] + dp[len - cut]); // first piece length = cut
  return dp[n]; // best revenue
} // end rodCutting

console.log('minCoins([1,2,5],11)      =', minCoins([1, 2, 5], 11)); // 3
console.log('coinCombinations([1,2,5],5)=', coinCombinations([1, 2, 5], 5)); // 4
console.log('coinPermutations([1,2,3],4)=', coinPermutations([1, 2, 3], 4)); // 7
console.log('rodCutting(n=8)           =', rodCutting([1, 5, 8, 9, 10, 17, 17, 20], 8)); // 22
