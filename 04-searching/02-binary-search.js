/**
 * TERM: Binary Search
 * DEFINITION: Binary search finds a target in a sorted array in O(log n) by repeatedly comparing with the middle and discarding half.
 * RELATED TERMS:
 *   - Lower bound: first index with value ≥ target.  Upper bound: first index with value > target.
 *   - Search in rotated sorted array: one half is always sorted, choose which half to keep.
 *   - Peak element: element greater than its neighbours, found with binary search on slope.
 *   - Overflow-safe mid: mid = lo + ((hi - lo) >> 1).
 * RUN: node 04-searching/02-binary-search.js
 */

function binarySearch(a, target) { // iterative version
  let lo = 0, hi = a.length - 1; // search space [lo, hi]
  while (lo <= hi) { // while range not empty
    const mid = lo + ((hi - lo) >> 1); // middle without overflow
    if (a[mid] === target) return mid; // found
    if (a[mid] < target) lo = mid + 1; // target is in right half
    else hi = mid - 1; // target is in left half
  } // end while
  return -1; // not found
} // end binarySearch

function binarySearchRecursive(a, t, lo = 0, hi = a.length - 1) { // recursive version, O(log n) stack
  if (lo > hi) return -1; // empty range
  const mid = (lo + hi) >> 1; // middle
  if (a[mid] === t) return mid; // found
  return a[mid] < t ? binarySearchRecursive(a, t, mid + 1, hi) : binarySearchRecursive(a, t, lo, mid - 1); // recurse on one half
} // end binarySearchRecursive

function lowerBound(a, t) { // first index with a[i] >= t
  let lo = 0, hi = a.length; // half-open range [lo, hi)
  while (lo < hi) { const mid = (lo + hi) >> 1; if (a[mid] < t) lo = mid + 1; else hi = mid; } // shrink toward the boundary
  return lo; // insertion point
} // end lowerBound

function upperBound(a, t) { // first index with a[i] > t
  let lo = 0, hi = a.length; // half-open range
  while (lo < hi) { const mid = (lo + hi) >> 1; if (a[mid] <= t) lo = mid + 1; else hi = mid; } // move past equal values
  return lo; // first greater
} // end upperBound

function searchRotated(a, t) { // e.g. [4,5,6,7,0,1,2]
  let lo = 0, hi = a.length - 1; // search space
  while (lo <= hi) { // standard loop
    const mid = (lo + hi) >> 1; // middle
    if (a[mid] === t) return mid; // found
    if (a[lo] <= a[mid]) { // left half is sorted
      if (a[lo] <= t && t < a[mid]) hi = mid - 1; else lo = mid + 1; // target inside left half?
    } else { // right half is sorted
      if (a[mid] < t && t <= a[hi]) lo = mid + 1; else hi = mid - 1; // target inside right half?
    } // end if
  } // end while
  return -1; // not found
} // end searchRotated

function findPeak(a) { // any peak index in O(log n)
  let lo = 0, hi = a.length - 1; // range
  while (lo < hi) { const mid = (lo + hi) >> 1; if (a[mid] < a[mid + 1]) lo = mid + 1; else hi = mid; } // climb uphill
  return lo; // peak index
} // end findPeak

const sorted = [1, 3, 3, 3, 5, 8, 13]; // sorted input
console.log('binarySearch(8)          =', binarySearch(sorted, 8)); // 5
console.log('binarySearchRecursive(5) =', binarySearchRecursive(sorted, 5)); // 4
console.log('lowerBound(3)            =', lowerBound(sorted, 3)); // 1
console.log('upperBound(3)            =', upperBound(sorted, 3)); // 4
console.log('count of 3               =', upperBound(sorted, 3) - lowerBound(sorted, 3)); // 3
console.log('searchRotated(0)         =', searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log('findPeak                 =', findPeak([1, 2, 3, 1])); // 2
