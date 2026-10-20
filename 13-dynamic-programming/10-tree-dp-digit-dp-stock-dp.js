/**
 * TERM: DP on Trees, Digit DP & State-Machine DP (Stock problems)
 * DEFINITION: Tree DP computes answers for each subtree from its children; Digit DP counts numbers up to N with a digit property by walking digits with a "tight" flag; state-machine DP models states like holding/not holding a stock.
 * RELATED TERMS:
 *   - Rerooting: computing a tree DP answer for every possible root.
 *   - Tight flag: whether the prefix so far equals N's prefix (limits the next digit).
 *   - Stock DP states: hold, sold, cooldown, transactions left.
 * RUN: node 13-dynamic-programming/10-tree-dp-digit-dp-stock-dp.js
 */

const { buildFromLevelOrder } = require('../_shared/tree-utils'); // tree builder

function robTree(root) { // House Robber III: no parent+child both robbed
  const dfs = (n) => { if (!n) return [0, 0]; const [lr, ls] = dfs(n.left), [rr, rs] = dfs(n.right); return [n.val + ls + rs, Math.max(lr, ls) + Math.max(rr, rs)]; }; // [rob n, skip n]
  return Math.max(...dfs(root)); // best of both choices at root
} // end robTree

function countNoConsecutiveSameDigits(N) { // digit DP: numbers in [1, N] with no two equal adjacent digits
  const d = String(N).split('').map(Number), memo = new Map(); // digits of N and cache
  const go = (pos, prev, tight, started) => { // pos = index, prev = last digit, tight = bounded by N, started = number has begun
    if (pos === d.length) return started ? 1 : 0; // count only real numbers
    const key = `${pos},${prev},${tight},${started}`; if (memo.has(key)) return memo.get(key); // cached
    let res = 0; const limit = tight ? d[pos] : 9; // max digit allowed here
    for (let x = 0; x <= limit; x++) { if (started && x === prev) continue; res += go(pos + 1, started || x ? x : -1, tight && x === limit, started || x > 0); } // try each digit
    memo.set(key, res); return res; // store
  }; // end go
  return go(0, -1, true, false); // start at first digit
} // end countNoConsecutiveSameDigits

function maxProfitOneTransaction(p) { let min = Infinity, best = 0; for (const x of p) { min = Math.min(min, x); best = Math.max(best, x - min); } return best; } // buy at lowest so far

function maxProfitUnlimited(p) { let hold = -Infinity, cash = 0; for (const x of p) [hold, cash] = [Math.max(hold, cash - x), Math.max(cash, hold + x)]; return cash; } // states: holding / not holding

function maxProfitWithCooldown(p) { // must rest one day after selling
  let hold = -Infinity, sold = 0, rest = 0; // three states
  for (const x of p) [hold, sold, rest] = [Math.max(hold, rest - x), hold + x, Math.max(rest, sold)]; // transitions between states
  return Math.max(sold, rest); // end not holding
} // end maxProfitWithCooldown

function maxProfitKTransactions(k, p) { // at most k buy-sell pairs
  const buy = new Array(k + 1).fill(-Infinity), sell = new Array(k + 1).fill(0); // best after j-th buy / sell
  for (const x of p) for (let j = 1; j <= k; j++) { buy[j] = Math.max(buy[j], sell[j - 1] - x); sell[j] = Math.max(sell[j], buy[j] + x); } // chain transactions
  return sell[k]; // best with k transactions
} // end maxProfitKTransactions

console.log('robTree (tree DP)        =', robTree(buildFromLevelOrder([3, 2, 3, null, 3, null, 1]))); // 7
console.log('digit DP count ≤ 100     =', countNoConsecutiveSameDigits(100)); // 90
const prices = [3, 3, 5, 0, 0, 3, 1, 4]; // sample prices
console.log('stock: one transaction   =', maxProfitOneTransaction(prices)); // 4
console.log('stock: unlimited         =', maxProfitUnlimited(prices)); // 8
console.log('stock: with cooldown     =', maxProfitWithCooldown([1, 2, 3, 0, 2])); // 3
console.log('stock: at most 2         =', maxProfitKTransactions(2, prices)); // 6
