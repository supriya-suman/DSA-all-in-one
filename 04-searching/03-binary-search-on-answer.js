/**
 * TERM: Binary Search on Answer (Parametric Search)
 * DEFINITION: When answers are monotonic (if x works, every larger x works), binary search over the answer range using a feasibility check.
 * RELATED TERMS:
 *   - Monotonic predicate: a yes/no function that flips only once across the range.
 *   - Integer square root, Koko eating bananas, book allocation, aggressive cows are classic examples.
 * RUN: node 04-searching/03-binary-search-on-answer.js
 */

function integerSqrt(n) { // largest x with x*x <= n
  let lo = 0, hi = n, ans = 0; // answer range
  while (lo <= hi) { // binary search
    const mid = Math.floor((lo + hi) / 2); // candidate
    if (mid * mid <= n) { ans = mid; lo = mid + 1; } // feasible → try bigger
    else hi = mid - 1; // too big
  } // end while
  return ans; // floor(sqrt(n))
} // end integerSqrt

function minEatingSpeed(piles, h) { // Koko: min speed to eat all piles in h hours
  const canFinish = (k) => piles.reduce((t, p) => t + Math.ceil(p / k), 0) <= h; // hours needed at speed k
  let lo = 1, hi = Math.max(...piles); // speed range
  while (lo < hi) { // find first feasible
    const mid = (lo + hi) >> 1; // candidate speed
    if (canFinish(mid)) hi = mid; else lo = mid + 1; // shrink toward minimum feasible
  } // end while
  return lo; // minimum speed
} // end minEatingSpeed

function bookAllocation(pages, students) { // minimize maximum pages any student reads
  const feasible = (limit) => { // can we split with max ≤ limit?
    let count = 1, sum = 0; // students used and current load
    for (const p of pages) { // assign books in order
      if (p > limit) return false; // a single book exceeds limit
      if (sum + p > limit) { count++; sum = p; } else sum += p; // start new student or add to current
    } // end for
    return count <= students; // enough students?
  }; // end feasible
  let lo = Math.max(...pages), hi = pages.reduce((a, b) => a + b, 0); // answer bounds
  while (lo < hi) { const mid = (lo + hi) >> 1; if (feasible(mid)) hi = mid; else lo = mid + 1; } // binary search
  return lo; // best limit
} // end bookAllocation

function aggressiveCows(stalls, cows) { // maximize the minimum distance between cows
  stalls = [...stalls].sort((a, b) => a - b); // positions sorted
  const canPlace = (d) => { let c = 1, last = stalls[0]; for (const s of stalls) if (s - last >= d) { c++; last = s; } return c >= cows; }; // greedy placement
  let lo = 1, hi = stalls[stalls.length - 1] - stalls[0]; // distance range
  while (lo < hi) { const mid = Math.ceil((lo + hi) / 2); if (canPlace(mid)) lo = mid; else hi = mid - 1; } // search for the largest feasible
  return lo; // best minimum distance
} // end aggressiveCows

console.log('integerSqrt(50)    =', integerSqrt(50)); // 7
console.log('minEatingSpeed     =', minEatingSpeed([3, 6, 7, 11], 8)); // 4
console.log('bookAllocation     =', bookAllocation([12, 34, 67, 90], 2)); // 113
console.log('aggressiveCows     =', aggressiveCows([1, 2, 4, 8, 9], 3)); // 3
