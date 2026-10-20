/**
 * TERM: Red-Black Tree
 * DEFINITION: A Red-Black tree is a self-balancing BST that colours nodes red or black and enforces colour rules so the longest path is at most twice the shortest, keeping operations O(log n).
 * RULES:
 *   1. Every node is red or black.  2. Root is black.  3. Red nodes cannot have red children.
 *   4. Every path from a node to its null leaves has the same number of black nodes (black-height).
 * RELATED TERMS:
 *   - Recolouring and rotations fix violations after insert.
 *   - Used by Java TreeMap, C++ std::map, Linux scheduler.
 * RUN: node 09-trees/05-red-black-tree.js
 */

const RED = 'R', BLACK = 'B'; // colour constants

class RBNode { constructor(val) { this.val = val; this.color = RED; this.left = this.right = this.parent = null; } } // new nodes start red

class RedBlackTree { // insertion-only implementation (search works like a BST)
  constructor() { this.root = null; } // empty tree

  #rotateLeft(x) { // x's right child moves up
    const y = x.right; x.right = y.left; if (y.left) y.left.parent = x; // move y's left subtree to x
    y.parent = x.parent; // link y to x's parent
    if (!x.parent) this.root = y; else if (x === x.parent.left) x.parent.left = y; else x.parent.right = y; // replace x with y
    y.left = x; x.parent = y; // x becomes y's left child
  } // end rotateLeft

  #rotateRight(x) { // mirror of rotateLeft
    const y = x.left; x.left = y.right; if (y.right) y.right.parent = x; // move y's right subtree to x
    y.parent = x.parent; // relink parent
    if (!x.parent) this.root = y; else if (x === x.parent.right) x.parent.right = y; else x.parent.left = y; // replace x with y
    y.right = x; x.parent = y; // x becomes y's right child
  } // end rotateRight

  insert(val) { // BST insert then fix colours
    const z = new RBNode(val); let y = null, x = this.root; // z is new node, y tracks parent
    while (x) { y = x; x = val < x.val ? x.left : x.right; } // find insert position
    z.parent = y; // attach to parent
    if (!y) this.root = z; else if (val < y.val) y.left = z; else y.right = z; // place as child
    this.#fixInsert(z); // restore red-black rules
  } // end insert

  #fixInsert(z) { // resolve red-red violations
    while (z.parent && z.parent.color === RED) { // only a problem when parent is red
      const gp = z.parent.parent; // grandparent
      const parentIsLeft = z.parent === gp.left; // which side the parent is on
      const uncle = parentIsLeft ? gp.right : gp.left; // parent's sibling
      if (uncle && uncle.color === RED) { // Case 1: red uncle → recolour
        z.parent.color = BLACK; uncle.color = BLACK; gp.color = RED; // push blackness down
        z = gp; // continue fixing from grandparent
      } else { // black uncle → rotations
        if (parentIsLeft && z === z.parent.right) { z = z.parent; this.#rotateLeft(z); } // Case 2 (triangle) → make it a line
        else if (!parentIsLeft && z === z.parent.left) { z = z.parent; this.#rotateRight(z); } // mirrored triangle
        z.parent.color = BLACK; z.parent.parent.color = RED; // Case 3 (line) recolour
        parentIsLeft ? this.#rotateRight(z.parent.parent) : this.#rotateLeft(z.parent.parent); // rotate grandparent
      } // end if
    } // end while
    this.root.color = BLACK; // rule 2: root is always black
  } // end fixInsert

  blackHeight(n = this.root) { // returns black-height or -1 if rule 4 is broken
    if (!n) return 1; // null leaves count as black
    const l = this.blackHeight(n.left), r = this.blackHeight(n.right); // heights of both sides
    if (l < 0 || r < 0 || l !== r) return -1; // mismatch
    return l + (n.color === BLACK ? 1 : 0); // add this node if black
  } // end blackHeight

  inorder(n = this.root, o = []) { if (n) { this.inorder(n.left, o); o.push(n.val + n.color); this.inorder(n.right, o); } return o; } // value + colour
} // end RedBlackTree

const rb = new RedBlackTree(); // empty tree
[10, 20, 30, 15, 25, 5, 1].forEach(v => rb.insert(v)); // insert keys
console.log('inorder (val+colour) =', rb.inorder().join(' ')); // sorted with colours
console.log('root                 =', rb.root.val + rb.root.color); // black root
console.log('black-height valid   =', rb.blackHeight()); // positive number means all rules hold
