/**
 * TERM: Linear Search
 * DEFINITION: Linear search checks each element one by one until the target is found, taking O(n) time and working on unsorted data.
 * RELATED TERMS:
 *   - Sentinel search: place the target at the end to remove the bounds check in the loop.
 * RUN: node 04-searching/01-linear-search.js
 */

function linearSearch(arr, target) { // O(n) time, O(1) space
  for (let i = 0; i < arr.length; i++) { // visit every index
    if (arr[i] === target) return i; // found → return its index
  } // end for
  return -1; // not found
} // end linearSearch

function sentinelSearch(arr, target) { // one comparison per loop iteration
  const a = [...arr, target]; // put sentinel (the target) at the end
  let i = 0; // start at first element
  while (a[i] !== target) i++; // guaranteed to stop at the sentinel
  return i < arr.length ? i : -1; // if we stopped at the sentinel, target wasn't present
} // end sentinelSearch

console.log('linearSearch   =', linearSearch([4, 2, 9, 7], 9)); // 2
console.log('sentinelSearch =', sentinelSearch([4, 2, 9, 7], 5)); // -1
