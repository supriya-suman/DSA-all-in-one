/**
 * TERM: Divide and Conquer
 * DEFINITION: Divide and conquer splits a problem into independent subproblems, solves them recursively, and combines their results (e.g. merge sort, quick sort, binary search).
 * RELATED TERMS:
 *   - Master Theorem: solves recurrences T(n) = aT(n/b) + f(n) (e.g. merge sort T(n)=2T(n/2)+n → O(n log n)).
 *   - Quickselect: find the k-th smallest element in O(n) average.
 *   - Closest pair of points in O(n log n).
 *   - Karatsuba multiplication: multiply big numbers with 3 recursive multiplications instead of 4.
 *   - Count of inversions and maximum subarray via divide & conquer.
 * RUN: node 16-divide-and-conquer/01-divide-and-conquer.js
 */

function quickselect(arr, k) { // k-th smallest (0-based), average O(n)
  const a = [...arr]; let lo = 0, hi = a.length - 1; // working copy and range
  while (true) { // iterative to avoid deep recursion
    const p = a[lo + Math.floor(Math.random() * (hi - lo + 1))]; // random pivot value
    let i = lo, lt = lo, gt = hi; // 3-way partition pointers
    while (i <= gt) { if (a[i] < p) [a[lt++], a[i++]] = [a[i], a[lt]]; else if (a[i] > p) [a[i], a[gt--]] = [a[gt], a[i]]; else i++; } // < p | = p | > p
    if (k < lt) hi = lt - 1; else if (k > gt) lo = gt + 1; else return p; // recurse into one side only
  } // end while
} // end quickselect

function maxSubarrayDC(a, lo = 0, hi = a.length - 1) { // O(n log n) alternative to Kadane
  if (lo === hi) return a[lo]; // single element
  const mid = (lo + hi) >> 1; // split
  let s = 0, leftBest = -Infinity; for (let i = mid; i >= lo; i--) { s += a[i]; leftBest = Math.max(leftBest, s); } // best sum ending at mid
  s = 0; let rightBest = -Infinity; for (let i = mid + 1; i <= hi; i++) { s += a[i]; rightBest = Math.max(rightBest, s); } // best sum starting at mid+1
  return Math.max(maxSubarrayDC(a, lo, mid), maxSubarrayDC(a, mid + 1, hi), leftBest + rightBest); // left, right, or crossing
} // end maxSubarrayDC

function closestPair(points) { // smallest distance between any two points
  const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]); // Euclidean distance
  const px = [...points].sort((a, b) => a[0] - b[0]); // sort by x once
  const rec = (pts) => { // pts sorted by x
    if (pts.length <= 3) { let best = Infinity; for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) best = Math.min(best, dist(pts[i], pts[j])); return best; } // brute force small sets
    const mid = pts.length >> 1, midX = pts[mid][0]; // split line
    const d = Math.min(rec(pts.slice(0, mid)), rec(pts.slice(mid))); // best on each side
    const strip = pts.filter(p => Math.abs(p[0] - midX) < d).sort((a, b) => a[1] - b[1]); // points near the split, by y
    let best = d; for (let i = 0; i < strip.length; i++) for (let j = i + 1; j < strip.length && strip[j][1] - strip[i][1] < best; j++) best = Math.min(best, dist(strip[i], strip[j])); // only a few neighbours to check
    return best; // overall best
  }; // end rec
  return rec(px); // answer
} // end closestPair

function karatsuba(x, y) { // multiply BigInts recursively
  if (x < 10n || y < 10n) return x * y; // base case: single digit
  const n = Math.max(x.toString().length, y.toString().length), half = BigInt(Math.floor(n / 2)), p = 10n ** half; // split position
  const [a, b] = [x / p, x % p], [c, d] = [y / p, y % p]; // x = a·p + b, y = c·p + d
  const ac = karatsuba(a, c), bd = karatsuba(b, d), mid = karatsuba(a + b, c + d) - ac - bd; // 3 multiplications instead of 4
  return ac * p * p + mid * p + bd; // recombine
} // end karatsuba

function masterTheorem(a, b, k) { // T(n) = a T(n/b) + Θ(n^k)
  const c = Math.log(a) / Math.log(b); // critical exponent log_b(a)
  if (Math.abs(c - k) < 1e-9) return `Θ(n^${k} log n)`; // case 2: balanced
  return c > k ? `Θ(n^${c.toFixed(2)})` : `Θ(n^${k})`; // case 1: leaves dominate, case 3: root dominates
} // end masterTheorem

console.log('quickselect(k=2)     =', quickselect([7, 10, 4, 3, 20, 15], 2)); // 7 (3rd smallest)
console.log('maxSubarrayDC        =', maxSubarrayDC([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log('closestPair          =', closestPair([[2, 3], [12, 30], [40, 50], [5, 1], [12, 10], [3, 4]]).toFixed(4)); // 1.4142
console.log('karatsuba            =', karatsuba(12345678n, 87654321n).toString(), '=', (12345678n * 87654321n).toString()); // same product
console.log('master: merge sort   =', masterTheorem(2, 2, 1)); // Θ(n^1 log n)
console.log('master: binary search=', masterTheorem(1, 2, 0)); // Θ(n^0 log n) = Θ(log n)
console.log('master: Karatsuba    =', masterTheorem(3, 2, 1)); // Θ(n^1.58)
