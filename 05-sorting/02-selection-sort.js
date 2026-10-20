/**
 * TERM: Selection Sort
 * DEFINITION: Selection sort repeatedly selects the minimum of the unsorted part and puts it at the front; O(n^2), in-place, not stable, makes at most n-1 swaps.
 * RUN: node 05-sorting/02-selection-sort.js
 */

function selectionSort(arr) { // always O(n^2) comparisons
  const a = [...arr]; // work on a copy
  for (let i = 0; i < a.length - 1; i++) { // position to fill
    let minIdx = i; // assume current is the minimum
    for (let j = i + 1; j < a.length; j++) if (a[j] < a[minIdx]) minIdx = j; // find true minimum in the rest
    if (minIdx !== i) [a[i], a[minIdx]] = [a[minIdx], a[i]]; // one swap per pass
  } // end for
  return a; // sorted copy
} // end selectionSort

console.log('selectionSort =', selectionSort([64, 25, 12, 22, 11])); // [11,12,22,25,64]
