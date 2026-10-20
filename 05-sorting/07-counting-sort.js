/**
 * TERM: Counting Sort
 * DEFINITION: Counting sort is a non-comparison sort that counts occurrences of each value in a small integer range and rebuilds the array; O(n + k) where k is the range.
 * RELATED TERMS:
 *   - Non-comparison sort: sorts using values/digits instead of comparisons, can beat O(n log n).
 * RUN: node 05-sorting/07-counting-sort.js
 */

function countingSort(arr) { // stable version using prefix counts
  if (!arr.length) return []; // empty input
  const min = Math.min(...arr), max = Math.max(...arr); // value range
  const count = new Array(max - min + 1).fill(0); // one bucket per value
  for (const x of arr) count[x - min]++; // count occurrences
  for (let i = 1; i < count.length; i++) count[i] += count[i - 1]; // prefix sums give final positions
  const out = new Array(arr.length); // output array
  for (let i = arr.length - 1; i >= 0; i--) out[--count[arr[i] - min]] = arr[i]; // place from the end to keep stability
  return out; // sorted array
} // end countingSort

console.log('countingSort =', countingSort([4, -2, 2, 8, 3, 3, 1])); // [-2,1,2,3,3,4,8]
