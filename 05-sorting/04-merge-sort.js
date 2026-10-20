/**
 * TERM: Merge Sort
 * DEFINITION: Merge sort is a divide-and-conquer sort that splits the array in half, sorts both halves recursively and merges them; O(n log n) always, stable, O(n) extra space.
 * RELATED TERMS:
 *   - Merge step: combining two sorted lists into one sorted list in linear time.
 *   - Inversion count: number of pairs i<j with a[i]>a[j]; counted during merging.
 *   - External sorting: merge sort is used to sort data too large for memory.
 * RUN: node 05-sorting/04-merge-sort.js
 */

function merge(left, right) { // merge two sorted arrays
  const out = []; let i = 0, j = 0; // output and two read pointers
  while (i < left.length && j < right.length) out.push(left[i] <= right[j] ? left[i++] : right[j++]); // take smaller; <= keeps it stable
  return out.concat(left.slice(i), right.slice(j)); // append leftovers
} // end merge

function mergeSort(a) { // recursive divide and conquer
  if (a.length <= 1) return a; // base case: already sorted
  const mid = a.length >> 1; // split point
  return merge(mergeSort(a.slice(0, mid)), mergeSort(a.slice(mid))); // sort halves and merge
} // end mergeSort

function countInversions(a) { // returns [sortedArray, inversions]
  if (a.length <= 1) return [a, 0]; // base case
  const mid = a.length >> 1; // split
  const [L, x] = countInversions(a.slice(0, mid)); // inversions inside left
  const [R, y] = countInversions(a.slice(mid)); // inversions inside right
  const out = []; let i = 0, j = 0, cross = 0; // merge while counting
  while (i < L.length && j < R.length) { // standard merge
    if (L[i] <= R[j]) out.push(L[i++]); // no inversion
    else { out.push(R[j++]); cross += L.length - i; } // every remaining left item is greater than R[j]
  } // end while
  return [out.concat(L.slice(i), R.slice(j)), x + y + cross]; // combine counts
} // end countInversions

console.log('mergeSort       =', mergeSort([38, 27, 43, 3, 9, 82, 10])); // [3,9,10,27,38,43,82]
console.log('countInversions =', countInversions([2, 4, 1, 3, 5])[1]); // 3
