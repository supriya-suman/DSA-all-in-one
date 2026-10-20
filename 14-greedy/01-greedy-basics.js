/**
 * TERM: Greedy Algorithms
 * DEFINITION: A greedy algorithm makes the locally best choice at each step, hoping (and, when proven, guaranteeing) it leads to a global optimum.
 * RELATED TERMS:
 *   - Greedy choice property: a global optimum can be reached by local optimal choices.
 *   - Exchange argument: proof technique swapping parts of an optimal solution with greedy choices.
 *   - Activity selection, fractional knapsack, jump game, gas station, assign cookies.
 * RUN: node 14-greedy/01-greedy-basics.js
 */

function activitySelection(acts) { // max non-overlapping activities [start, end]
  const sorted = [...acts].sort((a, b) => a[1] - b[1]); // earliest finish first
  const chosen = []; let lastEnd = -Infinity; // selected list and its last end time
  for (const [s, e] of sorted) if (s >= lastEnd) { chosen.push([s, e]); lastEnd = e; } // compatible → take it
  return chosen; // maximum set
} // end activitySelection

function fractionalKnapsack(items, W) { // items [value, weight]; fractions allowed
  let total = 0; // value gained
  for (const [v, w] of [...items].sort((a, b) => b[0] / b[1] - a[0] / a[1])) { // best value/weight ratio first
    if (W <= 0) break; // bag full
    const take = Math.min(w, W); total += (v / w) * take; W -= take; // take whole item or fraction that fits
  } // end for
  return total; // maximum value
} // end fractionalKnapsack

function canJump(nums) { // can we reach the last index?
  let reach = 0; // farthest index reachable
  for (let i = 0; i < nums.length; i++) { if (i > reach) return false; reach = Math.max(reach, i + nums[i]); } // stuck if i is beyond reach
  return true; // end reachable
} // end canJump

function gasStation(gas, cost) { // starting station to complete the circuit
  let total = 0, tank = 0, start = 0; // overall balance, current tank, candidate start
  for (let i = 0; i < gas.length; i++) { const d = gas[i] - cost[i]; total += d; tank += d; if (tank < 0) { start = i + 1; tank = 0; } } // can't start anywhere before i+1
  return total >= 0 ? start : -1; // feasible only if total gas ≥ total cost
} // end gasStation

function assignCookies(greed, sizes) { // max children satisfied
  greed = [...greed].sort((a, b) => a - b); sizes = [...sizes].sort((a, b) => a - b); // sort both
  let child = 0; for (const s of sizes) if (child < greed.length && s >= greed[child]) child++; // smallest cookie that satisfies the least greedy child
  return child; // satisfied count
} // end assignCookies

function minCoinsGreedy(coins, amount) { // works for canonical systems like Indian/US currency, NOT all systems
  const res = []; for (const c of [...coins].sort((a, b) => b - a)) while (amount >= c) { amount -= c; res.push(c); } // largest coin first
  return res; // coins used
} // end minCoinsGreedy

console.log('activitySelection  =', JSON.stringify(activitySelection([[1, 2], [3, 4], [0, 6], [5, 7], [8, 9], [5, 9]]))); // 4 activities
console.log('fractionalKnapsack =', fractionalKnapsack([[60, 10], [100, 20], [120, 30]], 50)); // 240
console.log('canJump            =', canJump([2, 3, 1, 1, 4]), canJump([3, 2, 1, 0, 4])); // true false
console.log('gasStation         =', gasStation([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])); // 3
console.log('assignCookies      =', assignCookies([1, 2, 3], [1, 1])); // 1
console.log('minCoinsGreedy(₹93)=', minCoinsGreedy([1, 2, 5, 10, 20, 50, 100, 500, 2000], 93)); // [50,20,20,2,1]
console.log('greedy fails [1,3,4] for 6 →', minCoinsGreedy([1, 3, 4], 6), '(optimal is [3,3]; use DP)'); // counter-example
