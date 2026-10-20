/**
 * TERM: Queue (FIFO)
 * DEFINITION: A queue is a First-In-First-Out collection where items enter at the rear (enqueue) and leave from the front (dequeue).
 * RELATED TERMS:
 *   - enqueue / dequeue / front / rear.
 *   - Queue using two stacks: amortized O(1) per operation.
 *   - Stack using queues: push O(n) by rotating the queue.
 * RUN: node 07-stacks-queues/02-queue.js
 */

class Queue { // O(1) queue using an object and two indices (array.shift() is O(n))
  constructor() { this.data = {}; this.head = 0; this.tail = 0; } // head = front index, tail = next free index
  enqueue(x) { this.data[this.tail++] = x; } // insert at rear
  dequeue() { if (this.isEmpty()) return undefined; const x = this.data[this.head]; delete this.data[this.head++]; return x; } // remove from front
  front() { return this.data[this.head]; } // peek front
  isEmpty() { return this.head === this.tail; } // no items between indices
  size() { return this.tail - this.head; } // count
} // end Queue

class QueueWithTwoStacks { // in-stack for pushes, out-stack for pops
  constructor() { this.inS = []; this.outS = []; } // two stacks
  enqueue(x) { this.inS.push(x); } // O(1)
  dequeue() { // amortized O(1)
    if (!this.outS.length) while (this.inS.length) this.outS.push(this.inS.pop()); // reverse order only when needed
    return this.outS.pop(); // oldest element
  } // end dequeue
} // end QueueWithTwoStacks

class StackWithQueue { // stack built from one queue
  constructor() { this.q = []; } // queue storage
  push(x) { this.q.push(x); for (let i = 0; i < this.q.length - 1; i++) this.q.push(this.q.shift()); } // rotate so newest is at front
  pop() { return this.q.shift(); } // front is the top
} // end StackWithQueue

const q = new Queue(); q.enqueue('a'); q.enqueue('b'); q.enqueue('c'); // a b c
console.log('dequeue / front   =', q.dequeue(), '/', q.front(), '| size', q.size()); // a / b | size 2
const q2 = new QueueWithTwoStacks(); [1, 2, 3].forEach(x => q2.enqueue(x)); // enqueue 1 2 3
console.log('two-stack queue   =', q2.dequeue(), q2.dequeue()); // 1 2
const sq = new StackWithQueue(); [1, 2, 3].forEach(x => sq.push(x)); // push 1 2 3
console.log('stack from queue  =', sq.pop(), sq.pop()); // 3 2
