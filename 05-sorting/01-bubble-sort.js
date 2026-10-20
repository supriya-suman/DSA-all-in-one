/**
 * TERM: Bubble Sort
 * DEFINITION: Bubble sort repeatedly swaps adjacent out-of-order elements so the largest "bubbles" to the end each pass; O(n^2), stable, in-place.
 * RELATED TERMS (apply to all sorts):
 *   - Stable sort: equal elements keep their original relative order.
 *   - In-place sort: uses O(1) extra memory.
 *   - Adaptive sort: runs faster on nearly sorted input.
 *   - Comparison sort: decides order only by comparing elements (lower bound Ω(n log n)).
 * RUN: node 05-sorting/01-bubble-sort.js
 */

function bubbleSort(arr) { // O(n^2) worst/average, O(n) best with early exit
  const a = [...arr]; // copy so input is untouched
  for (let i = 0; i < a.length - 1; i++) { // after pass i, last i items are in place
    let swapped = false; // detect a pass with no swaps
    for (let j = 0; j < a.length - 1 - i; j++) { // compare neighbours in unsorted part
      if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; swapped = true; } // swap if out of order
    } // end inner for
    if (!swapped) break; // already sorted → adaptive early exit
  } // end outer for
  return a; // sorted copy
} // end bubbleSort

console.log('bubbleSort =', bubbleSort([5, 1, 4, 2, 8])); // [1,2,4,5,8]
