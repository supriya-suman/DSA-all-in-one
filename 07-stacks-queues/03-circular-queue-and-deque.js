/**
 * TERM: Circular Queue (Ring Buffer) & Deque
 * DEFINITION: A circular queue reuses a fixed array by wrapping indices with modulo; a deque (double-ended queue) allows insert/remove at both ends in O(1).
 * RUN: node 07-stacks-queues/03-circular-queue-and-deque.js
 */

class CircularQueue { // fixed capacity ring buffer
  constructor(k) { this.buf = new Array(k); this.cap = k; this.front = 0; this.count = 0; } // storage, capacity, front index, size
  enqueue(x) { // add at rear
    if (this.isFull()) return false; // overflow
    this.buf[(this.front + this.count) % this.cap] = x; // rear index wraps around
    this.count++; return true; // grew by one
  } // end enqueue
  dequeue() { // remove from front
    if (this.isEmpty()) return undefined; // underflow
    const x = this.buf[this.front]; // front value
    this.front = (this.front + 1) % this.cap; this.count--; // advance front with wrap
    return x; // removed value
  } // end dequeue
  isEmpty() { return this.count === 0; } // empty check
  isFull() { return this.count === this.cap; } // full check
} // end CircularQueue

class Deque { // circular-array deque that grows when full
  constructor(cap = 4) { this.buf = new Array(cap); this.head = 0; this.size = 0; } // storage and state
  #grow() { // double capacity, O(n) occasionally → amortized O(1)
    const nb = new Array(this.buf.length * 2); // bigger array
    for (let i = 0; i < this.size; i++) nb[i] = this.buf[(this.head + i) % this.buf.length]; // copy in order
    this.buf = nb; this.head = 0; // reset head
  } // end grow
  pushFront(x) { if (this.size === this.buf.length) this.#grow(); this.head = (this.head - 1 + this.buf.length) % this.buf.length; this.buf[this.head] = x; this.size++; } // move head left
  pushBack(x) { if (this.size === this.buf.length) this.#grow(); this.buf[(this.head + this.size) % this.buf.length] = x; this.size++; } // write after last
  popFront() { if (!this.size) return undefined; const x = this.buf[this.head]; this.head = (this.head + 1) % this.buf.length; this.size--; return x; } // remove first
  popBack() { if (!this.size) return undefined; const i = (this.head + this.size - 1) % this.buf.length; this.size--; return this.buf[i]; } // remove last
  peekFront() { return this.buf[this.head]; } // first value
  peekBack() { return this.buf[(this.head + this.size - 1) % this.buf.length]; } // last value
} // end Deque

const cq = new CircularQueue(3); // capacity 3
cq.enqueue(1); cq.enqueue(2); cq.enqueue(3); // full
console.log('circular full?    =', cq.isFull(), '| enqueue 4 →', cq.enqueue(4)); // true | false
cq.dequeue(); cq.enqueue(4); // slot reused by wrapping
console.log('after wrap        =', cq.dequeue(), cq.dequeue(), cq.dequeue()); // 2 3 4
const dq = new Deque(); dq.pushBack(2); dq.pushFront(1); dq.pushBack(3); dq.pushFront(0); dq.pushBack(4); // 0 1 2 3 4 (grows)
console.log('deque front/back  =', dq.popFront(), dq.popBack(), '| peek', dq.peekFront(), dq.peekBack()); // 0 4 | 1 3
