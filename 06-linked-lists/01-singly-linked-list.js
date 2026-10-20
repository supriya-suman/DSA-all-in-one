/**
 * TERM: Singly Linked List
 * DEFINITION: A singly linked list is a chain of nodes where each node stores a value and a pointer to the next node; O(1) insert at head, O(n) search.
 * RELATED TERMS:
 *   - Node: holds data + reference(s).  Head: first node.  Tail: last node (next = null).
 *   - Dummy (sentinel) node: fake node before head that simplifies edge cases.
 * RUN: node 06-linked-lists/01-singly-linked-list.js
 */

class Node { // single list node
  constructor(val, next = null) { this.val = val; this.next = next; } // store value and pointer to next node
} // end Node

class SinglyLinkedList { // list wrapper with head pointer
  constructor() { this.head = null; this.size = 0; } // start empty

  insertAtHead(val) { this.head = new Node(val, this.head); this.size++; } // new node points to old head, O(1)

  insertAtTail(val) { // O(n) without a tail pointer
    const node = new Node(val); // node to append
    if (!this.head) { this.head = node; this.size++; return; } // empty list case
    let cur = this.head; // start at head
    while (cur.next) cur = cur.next; // walk to the last node
    cur.next = node; this.size++; // link new node
  } // end insertAtTail

  insertAt(index, val) { // insert at a position using a dummy node
    const dummy = new Node(0, this.head); let prev = dummy; // dummy simplifies index 0
    for (let i = 0; i < index && prev.next; i++) prev = prev.next; // move to node before index
    prev.next = new Node(val, prev.next); // splice in
    this.head = dummy.next; this.size++; // head may have changed
  } // end insertAt

  delete(val) { // remove first node with value
    const dummy = new Node(0, this.head); let prev = dummy; // dummy before head
    while (prev.next && prev.next.val !== val) prev = prev.next; // find predecessor
    if (prev.next) { prev.next = prev.next.next; this.size--; } // unlink target
    this.head = dummy.next; // update head
  } // end delete

  search(val) { // linear search O(n)
    let cur = this.head, i = 0; // start at head
    while (cur) { if (cur.val === val) return i; cur = cur.next; i++; } // walk the chain
    return -1; // not found
  } // end search

  toArray() { const out = []; for (let c = this.head; c; c = c.next) out.push(c.val); return out; } // traversal
} // end SinglyLinkedList

const list = new SinglyLinkedList(); // create empty list
list.insertAtTail(10); list.insertAtTail(20); list.insertAtHead(5); // 5 → 10 → 20
list.insertAt(2, 15); // 5 → 10 → 15 → 20
console.log('list        =', list.toArray().join(' → ')); // print chain
console.log('search(15)  =', list.search(15)); // 2
list.delete(10); // remove 10
console.log('after delete=', list.toArray().join(' → '), '| size', list.size); // 5 → 15 → 20

