/**
 * TERM: Heap Sort
 * DEFINITION: Heap sort builds a max-heap from the array and repeatedly moves the maximum to the end; O(n log n) always, in-place, not stable.
 * RELATED TERMS:
 *   - Heapify (sift down): fix a heap where only the root may be wrong.
 *   - Build-heap: heapify all internal nodes bottom-up in O(n).
 * RUN: node 05-sorting/06-heap-sort.js
 */

function siftDown(a, i, size) { // push a[i] down until heap property holds
  while (true) { // loop down the tree
    const l = 2 * i + 1, r = 2 * i + 2; // children indices
    let largest = i; // assume parent is largest
    if (l < size && a[l] > a[largest]) largest = l; // left child bigger?
    if (r < size && a[r] > a[largest]) largest = r; // right child bigger?
    if (largest === i) return; // heap property satisfied
    [a[i], a[largest]] = [a[largest], a[i]]; // swap with larger child
    i = largest; // continue from child position
  } // end while
} // end siftDown

function heapSort(arr) { // sort ascending
  const a = [...arr]; // copy input
  for (let i = (a.length >> 1) - 1; i >= 0; i--) siftDown(a, i, a.length); // build max-heap in O(n)
  for (let end = a.length - 1; end > 0; end--) { // shrink heap one by one
    [a[0], a[end]] = [a[end], a[0]]; // move current max to its final spot
    siftDown(a, 0, end); // restore heap on the remaining part
  } // end for
  return a; // sorted array
} // end heapSort

console.log('heapSort =', heapSort([12, 11, 13, 5, 6, 7])); // [5,6,7,11,12,13]
