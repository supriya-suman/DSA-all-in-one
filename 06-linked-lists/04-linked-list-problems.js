/**
 * TERM: Classic Linked List Techniques (Reverse, Floyd's Cycle Detection, Middle, Merge)
 * DEFINITION: Core pointer techniques: reversing links in place, Floyd's tortoise-and-hare to detect cycles, finding the middle, and merging sorted lists.
 * RELATED TERMS:
 *   - Floyd's cycle detection (tortoise & hare): slow moves 1, fast moves 2; they meet iff there's a cycle.
 *   - Cycle start: reset one pointer to head, move both by 1; they meet at the cycle start.
 *   - Kth node from end: move fast k steps first, then move both.
 * RUN: node 06-linked-lists/04-linked-list-problems.js
 */

class ListNode { constructor(val, next = null) { this.val = val; this.next = next; } } // basic node
const build = (arr) => arr.reduceRight((next, v) => new ListNode(v, next), null); // array → list
const toArr = (h) => { const o = []; while (h) { o.push(h.val); h = h.next; } return o; }; // list → array

function reverseIterative(head) { // O(n) time, O(1) space
  let prev = null, cur = head; // prev starts as the new tail (null)
  while (cur) { const next = cur.next; cur.next = prev; prev = cur; cur = next; } // flip each pointer
  return prev; // new head
} // end reverseIterative

function reverseRecursive(head) { // O(n) stack space
  if (!head || !head.next) return head; // base case: empty or one node
  const newHead = reverseRecursive(head.next); // reverse the rest
  head.next.next = head; head.next = null; // make next node point back to head
  return newHead; // head of reversed list
} // end reverseRecursive

function middleNode(head) { // slow/fast pointers
  let slow = head, fast = head; // both start at head
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; } // fast moves twice as fast
  return slow; // slow is at the middle
} // end middleNode

function detectCycleStart(head) { // Floyd's algorithm
  let slow = head, fast = head; // tortoise and hare
  while (fast && fast.next) { // fast reaches null if no cycle
    slow = slow.next; fast = fast.next.next; // move 1 and 2
    if (slow === fast) { // they met inside the cycle
      slow = head; // reset one pointer
      while (slow !== fast) { slow = slow.next; fast = fast.next; } // move both by 1
      return slow; // meeting point = cycle start
    } // end if
  } // end while
  return null; // no cycle
} // end detectCycleStart

function mergeSorted(a, b) { // merge two sorted lists
  const dummy = new ListNode(0); let tail = dummy; // dummy head
  while (a && b) { if (a.val <= b.val) { tail.next = a; a = a.next; } else { tail.next = b; b = b.next; } tail = tail.next; } // attach smaller
  tail.next = a || b; // attach leftovers
  return dummy.next; // merged head
} // end mergeSorted

function removeKthFromEnd(head, k) { // two pointers k apart
  const dummy = new ListNode(0, head); let fast = dummy, slow = dummy; // start before head
  for (let i = 0; i <= k; i++) fast = fast.next; // move fast k+1 steps
  while (fast) { fast = fast.next; slow = slow.next; } // move both until fast falls off
  slow.next = slow.next.next; // skip target
  return dummy.next; // new head
} // end removeKthFromEnd

function isPalindromeList(head) { // find middle, reverse second half, compare
  let second = reverseIterative(middleNode(head)); // reversed second half
  for (let a = head, b = second; b; a = a.next, b = b.next) if (a.val !== b.val) return false; // compare halves
  return true; // all matched
} // end isPalindromeList

console.log('reverseIterative =', toArr(reverseIterative(build([1, 2, 3, 4, 5])))); // [5,4,3,2,1]
console.log('reverseRecursive =', toArr(reverseRecursive(build([1, 2, 3])))); // [3,2,1]
console.log('middleNode       =', middleNode(build([1, 2, 3, 4, 5])).val); // 3
const cyc = build([3, 2, 0, -4]); cyc.next.next.next.next = cyc.next; // create cycle back to node 2
console.log('cycle starts at  =', detectCycleStart(cyc).val); // 2
console.log('mergeSorted      =', toArr(mergeSorted(build([1, 2, 4]), build([1, 3, 4])))); // [1,1,2,3,4,4]
console.log('removeKthFromEnd =', toArr(removeKthFromEnd(build([1, 2, 3, 4, 5]), 2))); // [1,2,3,5]
console.log('isPalindromeList =', isPalindromeList(build([1, 2, 2, 1]))); // true
