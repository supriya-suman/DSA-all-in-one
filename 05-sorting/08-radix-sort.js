/**
 * TERM: Radix Sort
 * DEFINITION: Radix sort sorts integers digit by digit (least significant first) using a stable counting sort for each digit; O(d * (n + b)).
 * RELATED TERMS:
 *   - LSD radix: least significant digit first.  MSD radix: most significant digit first.
 *   - Base (b): number of possible digit values (10 for decimal).
 * RUN: node 05-sorting/08-radix-sort.js
 */

function countingByDigit(a, exp) { // stable sort by digit at position exp (1, 10, 100…)
  const out = new Array(a.length), count = new Array(10).fill(0); // output and digit counts
  for (const x of a) count[Math.floor(x / exp) % 10]++; // count each digit
  for (let i = 1; i < 10; i++) count[i] += count[i - 1]; // prefix sums
  for (let i = a.length - 1; i >= 0; i--) out[--count[Math.floor(a[i] / exp) % 10]] = a[i]; // place stably from the end
  return out; // sorted by this digit
} // end countingByDigit

function radixSort(arr) { // non-negative integers
  let a = [...arr]; // copy
  const max = Math.max(...a); // determines number of digits
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) a = countingByDigit(a, exp); // one pass per digit
  return a; // sorted
} // end radixSort

console.log('radixSort =', radixSort([170, 45, 75, 90, 802, 24, 2, 66])); // [2,24,45,66,75,90,170,802]
