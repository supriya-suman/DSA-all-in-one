/**
 * SHARED HELPER (not a lesson): the MinHeap / priority queue class from 10-heaps/01-binary-heap-priority-queue.js,
 * exported so heap, graph and greedy files can import it without re-running that file's demo.
 * DEFINITION: A binary heap stored in an array that always returns the smallest item (by comparator) first.
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

module.exports = { MinHeap }; // export the class
