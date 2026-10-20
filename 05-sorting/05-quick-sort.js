/**
 * TERM: Quick Sort
 * DEFINITION: Quick sort picks a pivot, partitions smaller elements to its left and larger to its right, then recursively sorts both sides; O(n log n) average, O(n^2) worst, in-place, not stable.
 * RELATED TERMS:
 *   - Pivot: the element used to split the array.
 *   - Lomuto partition: pivot is the last element, single scanning pointer.
 *   - Hoare partition: two pointers move toward each other; fewer swaps.
 *   - Randomized pivot: picking a random pivot avoids the O(n^2) worst case on sorted input.
 * RUN: node 05-sorting/05-quick-sort.js
 */

function lomutoPartition(a, lo, hi) { // pivot = a[hi]
  const pivot = a[hi]; // choose last element
  let i = lo; // boundary of the "< pivot" region
  for (let j = lo; j < hi; j++) if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; i++; } // grow smaller region
  [a[i], a[hi]] = [a[hi], a[i]]; // put pivot between regions
  return i; // final pivot index
} // end lomutoPartition

function quickSort(a, lo = 0, hi = a.length - 1) { // in-place quicksort with random pivot
  if (lo >= hi) return a; // zero or one element
  const r = lo + Math.floor(Math.random() * (hi - lo + 1)); // random pivot index
  [a[r], a[hi]] = [a[hi], a[r]]; // move random pivot to the end
  const p = lomutoPartition(a, lo, hi); // partition around pivot
  quickSort(a, lo, p - 1); // sort left part
  quickSort(a, p + 1, hi); // sort right part
  return a; // sorted array
} // end quickSort

function hoarePartition(a, lo, hi) { // pivot = middle element
  const pivot = a[(lo + hi) >> 1]; // middle value
  let i = lo - 1, j = hi + 1; // pointers outside the range
  while (true) { // until pointers cross
    do i++; while (a[i] < pivot); // find item ≥ pivot from left
    do j--; while (a[j] > pivot); // find item ≤ pivot from right
    if (i >= j) return j; // crossed → split index
    [a[i], a[j]] = [a[j], a[i]]; // swap misplaced pair
  } // end while
} // end hoarePartition

function quickSortHoare(a, lo = 0, hi = a.length - 1) { // variant using Hoare scheme
  if (lo >= hi) return a; // base case
  const p = hoarePartition(a, lo, hi); // split index
  quickSortHoare(a, lo, p); // left side includes p in Hoare scheme
  quickSortHoare(a, p + 1, hi); // right side
  return a; // sorted
} // end quickSortHoare

console.log('quickSort (Lomuto) =', quickSort([10, 7, 8, 9, 1, 5])); // [1,5,7,8,9,10]
console.log('quickSort (Hoare)  =', quickSortHoare([3, 6, 8, 10, 1, 2, 1])); // [1,1,2,3,6,8,10]
