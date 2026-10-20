/**
 * TERM: Ternary, Jump, Exponential & Interpolation Search
 * DEFINITION: Variants of searching: ternary search finds the max/min of a unimodal function; jump search skips √n blocks; exponential search doubles a range then binary searches; interpolation search guesses position by value.
 * RELATED TERMS:
 *   - Unimodal function: increases then decreases (one peak).
 *   - Unbounded/infinite array search: solved by exponential search.
 * RUN: node 04-searching/04-ternary-jump-exponential-interpolation.js
 */

function ternarySearchMax(f, lo, hi, iters = 100) { // maximum of a unimodal f on [lo, hi]
  for (let i = 0; i < iters; i++) { // each step removes one third
    const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; // two probe points
    if (f(m1) < f(m2)) lo = m1; else hi = m2; // the peak is not in the lower third
  } // end for
  return (lo + hi) / 2; // x where f is maximum
} // end ternarySearchMax

function jumpSearch(a, t) { // O(√n) on a sorted array
  const step = Math.floor(Math.sqrt(a.length)); // block size
  let prev = 0, cur = step; // block boundaries
  while (cur < a.length && a[cur - 1] < t) { prev = cur; cur += step; } // jump block by block
  for (let i = prev; i < Math.min(cur, a.length); i++) if (a[i] === t) return i; // linear scan inside block
  return -1; // not found
} // end jumpSearch

function exponentialSearch(a, t) { // O(log i) where i is target position
  if (a[0] === t) return 0; // check first element
  let bound = 1; // range end
  while (bound < a.length && a[bound] < t) bound *= 2; // double until we pass the target
  let lo = bound >> 1, hi = Math.min(bound, a.length - 1); // range to binary search
  while (lo <= hi) { const mid = (lo + hi) >> 1; if (a[mid] === t) return mid; if (a[mid] < t) lo = mid + 1; else hi = mid - 1; } // binary search
  return -1; // not found
} // end exponentialSearch

function interpolationSearch(a, t) { // O(log log n) on uniformly distributed data
  let lo = 0, hi = a.length - 1; // range
  while (lo <= hi && t >= a[lo] && t <= a[hi]) { // target must lie in value range
    if (a[hi] === a[lo]) return a[lo] === t ? lo : -1; // avoid division by zero
    const pos = lo + Math.floor(((t - a[lo]) * (hi - lo)) / (a[hi] - a[lo])); // estimate position from value
    if (a[pos] === t) return pos; // found
    if (a[pos] < t) lo = pos + 1; else hi = pos - 1; // narrow range
  } // end while
  return -1; // not found
} // end interpolationSearch

const data = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]; // sorted sample
console.log('ternarySearchMax  =', ternarySearchMax(x => -((x - 2) ** 2) + 5, -10, 10).toFixed(4)); // ≈ 2
console.log('jumpSearch(15)    =', jumpSearch(data, 15)); // 7
console.log('exponentialSearch =', exponentialSearch(data, 17)); // 8
console.log('interpolation(9)  =', interpolationSearch(data, 9)); // 4
