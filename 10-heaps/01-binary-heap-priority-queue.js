/**
 * TERM: Binary Heap & Priority Queue
 * DEFINITION: A binary heap is a complete binary tree stored in an array where every parent is ≤ (min-heap) or ≥ (max-heap) its children; it implements a priority queue with O(log n) insert/remove and O(1) peek.
 * RELATED TERMS:
 *   - Array indexing: parent(i) = (i-1)/2, left(i) = 2i+1, right(i) = 2i+2.
 *   - Sift up (bubble up) after insert; sift down (heapify) after removing the root.
 *   - Build heap in O(n) by sifting down from the last internal node.
 *   - Priority queue: abstract type that always serves the highest-priority item first.
 * RUN: node 10-heaps/01-binary-heap-priority-queue.js
 */

class MinHeap { // generic heap with a comparator
  constructor(compare = (a, b) => a - b) { this.data = []; this.compare = compare; } // compare < 0 means a has higher priority
  size() { return this.data.length; } // number of items
  peek() { return this.data[0]; } // top item O(1)

  push(x) { // insert O(log n)
    this.data.push(x); // add at the end (keeps tree complete)
    let i = this.data.length - 1; // index of new item
    while (i > 0) { // sift up
      const p = (i - 1) >> 1; // parent index
      if (this.compare(this.data[i], this.data[p]) >= 0) break; // heap property holds
      [this.data[i], this.data[p]] = [this.data[p], this.data[i]]; i = p; // swap with parent
    } // end while
  } // end push

  pop() { // remove top O(log n)
    if (!this.data.length) return undefined; // empty heap
    const top = this.data[0], last = this.data.pop(); // save root, remove last
    if (this.data.length) { this.data[0] = last; this.#siftDown(0); } // move last to root and fix
    return top; // highest priority item
  } // end pop

  #siftDown(i) { // push item down until children are larger
    const n = this.data.length; // heap size
    while (true) { // loop down
      const l = 2 * i + 1, r = l + 1; let best = i; // children and current best
      if (l < n && this.compare(this.data[l], this.data[best]) < 0) best = l; // left child better?
      if (r < n && this.compare(this.data[r], this.data[best]) < 0) best = r; // right child better?
      if (best === i) return; // done
      [this.data[i], this.data[best]] = [this.data[best], this.data[i]]; i = best; // swap and continue
    } // end while
  } // end siftDown

  static heapify(arr, compare) { // build heap in O(n)
    const h = new MinHeap(compare); h.data = [...arr]; // copy items
    for (let i = (arr.length >> 1) - 1; i >= 0; i--) h.#siftDown(i); // sift down internal nodes from bottom
    return h; // ready heap
  } // end heapify
} // end MinHeap

const minH = new MinHeap(); [5, 3, 8, 1, 9, 2].forEach(x => minH.push(x)); // insert into min-heap
console.log('min-heap pops   =', Array.from({ length: 6 }, () => minH.pop()).join(' ')); // 1 2 3 5 8 9
const maxH = MinHeap.heapify([5, 3, 8, 1, 9, 2], (a, b) => b - a); // reversed comparator → max-heap
console.log('max-heap peek   =', maxH.peek()); // 9
const pq = new MinHeap((a, b) => a.priority - b.priority); // priority queue of tasks
pq.push({ task: 'email', priority: 3 }); pq.push({ task: 'bugfix', priority: 1 }); pq.push({ task: 'lunch', priority: 2 }); // add tasks
console.log('priority order  =', [pq.pop(), pq.pop(), pq.pop()].map(t => t.task).join(' → ')); // bugfix → lunch → email
