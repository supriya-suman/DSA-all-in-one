/**
 * TERM: Circular Linked List
 * DEFINITION: A circular linked list's last node points back to the first node, so traversal can loop forever; useful for round-robin scheduling.
 * RELATED TERMS:
 *   - Josephus problem: eliminate every k-th person in a circle; simulated with a circular list.
 * RUN: node 06-linked-lists/03-circular-linked-list.js
 */

class CNode { constructor(val) { this.val = val; this.next = this; } } // a lone node points to itself

class CircularList { // keep a pointer to the tail (tail.next is head)
  constructor() { this.tail = null; } // empty list
  append(val) { // O(1) insert at end
    const n = new CNode(val); // new node
    if (!this.tail) { this.tail = n; return; } // first node
    n.next = this.tail.next; // new node points to head
    this.tail.next = n; // old tail points to new node
    this.tail = n; // new node is the tail
  } // end append
  toArray() { // traverse exactly once around
    if (!this.tail) return []; // empty
    const out = []; let c = this.tail.next; // start from head
    do { out.push(c.val); c = c.next; } while (c !== this.tail.next); // stop when back at head
    return out; // values
  } // end toArray
} // end CircularList

function josephus(n, k) { // last survivor when every k-th person is removed
  const list = new CircularList(); // build circle 1..n
  for (let i = 1; i <= n; i++) list.append(i); // add people
  let prev = list.tail; // node before current
  while (prev.next !== prev) { // until one node remains
    for (let i = 1; i < k; i++) prev = prev.next; // move k-1 steps
    prev.next = prev.next.next; // eliminate the k-th
  } // end while
  return prev.val; // survivor
} // end josephus

const cl = new CircularList(); [1, 2, 3, 4].forEach(v => cl.append(v)); // build 1→2→3→4→(1)
console.log('circular list =', cl.toArray().join(' → '), '→ (back to 1)'); // print once around
console.log('josephus(7,3) =', josephus(7, 3)); // 4
