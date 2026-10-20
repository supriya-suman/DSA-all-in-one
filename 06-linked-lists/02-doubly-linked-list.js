/**
 * TERM: Doubly Linked List
 * DEFINITION: A doubly linked list node has pointers to both its previous and next nodes, allowing O(1) deletion of a known node and traversal both ways.
 * RUN: node 06-linked-lists/02-doubly-linked-list.js
 */

class DNode { // node with prev and next
  constructor(val) { this.val = val; this.prev = null; this.next = null; } // both links start empty
} // end DNode

class DoublyLinkedList { // uses head and tail sentinels
  constructor() { // set up sentinels so there are no null checks
    this.head = new DNode(null); this.tail = new DNode(null); // dummy ends
    this.head.next = this.tail; this.tail.prev = this.head; // link them together
  } // end constructor

  insertAfter(node, val) { // O(1) insertion after a given node
    const n = new DNode(val); // new node
    n.prev = node; n.next = node.next; // point to neighbours
    node.next.prev = n; node.next = n; // neighbours point back
    return n; // return created node
  } // end insertAfter

  pushFront(val) { return this.insertAfter(this.head, val); } // add at front
  pushBack(val) { return this.insertAfter(this.tail.prev, val); } // add at back

  remove(node) { // O(1) removal when we hold the node
    node.prev.next = node.next; // skip forward
    node.next.prev = node.prev; // skip backward
  } // end remove

  forward() { const o = []; for (let c = this.head.next; c !== this.tail; c = c.next) o.push(c.val); return o; } // head → tail
  backward() { const o = []; for (let c = this.tail.prev; c !== this.head; c = c.prev) o.push(c.val); return o; } // tail → head
} // end DoublyLinkedList

const dll = new DoublyLinkedList(); // empty list
dll.pushBack(1); const two = dll.pushBack(2); dll.pushBack(3); dll.pushFront(0); // 0 1 2 3
console.log('forward  =', dll.forward().join(' ⇄ ')); // 0 ⇄ 1 ⇄ 2 ⇄ 3
dll.remove(two); // delete node 2 in O(1)
console.log('backward =', dll.backward().join(' ⇄ ')); // 3 ⇄ 1 ⇄ 0
