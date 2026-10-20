/**
 * TERM: Heap Problem Patterns (Top-K, K-way Merge, Median of a Stream)
 * DEFINITION: Heaps efficiently keep the k best items, merge k sorted lists, and maintain a running median using two heaps.
 * RELATED TERMS:
 *   - Top-K pattern: keep a min-heap of size k → O(n log k).
 *   - K-way merge: heap holds the current head of each list.
 *   - Two-heap pattern: max-heap for the lower half, min-heap for the upper half.
 *   - Kth largest element.
 * RUN: node 10-heaps/02-heap-problems.js
 */

const { MinHeap } = require('../_shared/min-heap'); // shared heap class

function kthLargest(nums, k) { // keep k largest in a min-heap
  const h = new MinHeap(); // min-heap of size ≤ k
  for (const x of nums) { h.push(x); if (h.size() > k) h.pop(); } // drop the smallest when too big
  return h.peek(); // smallest of the k largest = kth largest
} // end kthLargest

function topKFrequent(nums, k) { // most frequent k elements
  const freq = new Map(); for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1); // count
  const h = new MinHeap((a, b) => a[1] - b[1]); // min-heap by frequency
  for (const e of freq) { h.push(e); if (h.size() > k) h.pop(); } // keep k most frequent
  return h.data.map(e => e[0]).sort((a, b) => freq.get(b) - freq.get(a)); // values, most frequent first
} // end topKFrequent

function mergeKSorted(lists) { // merge k sorted arrays in O(N log k)
  const h = new MinHeap((a, b) => a[0] - b[0]); // entries [value, listIndex, elementIndex]
  lists.forEach((l, i) => l.length && h.push([l[0], i, 0])); // push head of each list
  const out = []; // merged result
  while (h.size()) { // until heap is empty
    const [v, li, ei] = h.pop(); out.push(v); // take the smallest head
    if (ei + 1 < lists[li].length) h.push([lists[li][ei + 1], li, ei + 1]); // push next element of that list
  } // end while
  return out; // merged array
} // end mergeKSorted

class MedianFinder { // running median with two heaps
  constructor() { this.low = new MinHeap((a, b) => b - a); this.high = new MinHeap(); } // low = max-heap, high = min-heap
  add(x) { // O(log n)
    this.low.push(x); // add to lower half
    this.high.push(this.low.pop()); // move largest of lower half to upper half
    if (this.high.size() > this.low.size()) this.low.push(this.high.pop()); // keep low the same size or one bigger
  } // end add
  median() { return this.low.size() > this.high.size() ? this.low.peek() : (this.low.peek() + this.high.peek()) / 2; } // middle value(s)
} // end MedianFinder

function kClosestPoints(points, k) { // k points closest to origin
  const h = new MinHeap((a, b) => (b[0] ** 2 + b[1] ** 2) - (a[0] ** 2 + a[1] ** 2)); // max-heap by distance
  for (const p of points) { h.push(p); if (h.size() > k) h.pop(); } // evict the farthest
  return h.data; // k closest
} // end kClosestPoints

console.log('kthLargest(k=2)  =', kthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
console.log('topKFrequent(2)  =', topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1,2]
console.log('mergeKSorted     =', mergeKSorted([[1, 4, 5], [1, 3, 4], [2, 6]]).join(' ')); // 1 1 2 3 4 4 5 6
const mf = new MedianFinder(); [5, 15, 1, 3].forEach(x => { mf.add(x); process.stdout.write(`median after ${x}: ${mf.median()}  `); }); console.log(); // 5 10 5 4
console.log('kClosestPoints   =', JSON.stringify(kClosestPoints([[3, 3], [5, -1], [-2, 4]], 2))); // [[3,3],[-2,4]] in heap order
