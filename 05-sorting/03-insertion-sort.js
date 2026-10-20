/**
 * TERM: Insertion Sort
 * DEFINITION: Insertion sort builds the sorted array one item at a time by inserting each element into its correct place among the already-sorted items; O(n^2), O(n) on nearly sorted input, stable.
 * RUN: node 05-sorting/03-insertion-sort.js
 */

function insertionSort(arr) { // great for small or almost sorted arrays
  const a = [...arr]; // copy input
  for (let i = 1; i < a.length; i++) { // a[0..i-1] is already sorted
    const key = a[i]; // element to insert
    let j = i - 1; // start comparing from its left neighbour
    while (j >= 0 && a[j] > key) { a[j + 1] = a[j]; j--; } // shift bigger elements right
    a[j + 1] = key; // drop key into the gap
  } // end for
  return a; // sorted copy
} // end insertionSort

console.log('insertionSort =', insertionSort([12, 11, 13, 5, 6])); // [5,6,11,12,13]
