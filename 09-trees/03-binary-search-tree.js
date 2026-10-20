/**
 * TERM: Binary Search Tree (BST)
 * DEFINITION: A BST is a binary tree where every node's left subtree holds smaller keys and right subtree holds larger keys, so search/insert/delete take O(h).
 * RELATED TERMS:
 *   - Inorder traversal of a BST gives sorted order.
 *   - Inorder successor / predecessor: next larger / next smaller key.
 *   - Floor / Ceil: largest key ≤ x / smallest key ≥ x.
 *   - Deleting a node with two children: replace it with its inorder successor.
 *   - Validate BST: check every node is inside a (min, max) range.
 * RUN: node 09-trees/03-binary-search-tree.js
 */

const { TreeNode, inorder } = require('../_shared/tree-utils'); // shared node + inorder

function insert(root, val) { // O(h)
  if (!root) return new TreeNode(val); // empty spot → new node
  if (val < root.val) root.left = insert(root.left, val); // go left for smaller
  else if (val > root.val) root.right = insert(root.right, val); // go right for larger (duplicates ignored)
  return root; // unchanged root pointer
} // end insert

function search(root, val) { // O(h) iterative
  while (root && root.val !== val) root = val < root.val ? root.left : root.right; // discard one side each step
  return root; // node or null
} // end search

const minNode = (n) => { while (n.left) n = n.left; return n; }; // leftmost node is minimum

function remove(root, val) { // three cases: leaf, one child, two children
  if (!root) return null; // value not found
  if (val < root.val) root.left = remove(root.left, val); // search left
  else if (val > root.val) root.right = remove(root.right, val); // search right
  else { // found the node
    if (!root.left) return root.right; // zero or one (right) child
    if (!root.right) return root.left; // one (left) child
    const succ = minNode(root.right); // inorder successor
    root.val = succ.val; // copy successor value
    root.right = remove(root.right, succ.val); // delete successor from right subtree
  } // end if
  return root; // updated subtree
} // end remove

function isValidBST(n, lo = -Infinity, hi = Infinity) { // range check
  if (!n) return true; // empty is valid
  if (n.val <= lo || n.val >= hi) return false; // outside allowed range
  return isValidBST(n.left, lo, n.val) && isValidBST(n.right, n.val, hi); // tighten ranges
} // end isValidBST

function kthSmallest(root, k) { // iterative inorder, stop at k
  const st = []; let cur = root; // stack
  while (cur || st.length) { while (cur) { st.push(cur); cur = cur.left; } cur = st.pop(); if (--k === 0) return cur.val; cur = cur.right; } // count visits
  return null; // k too large
} // end kthSmallest

function floorCeil(root, x) { // largest ≤ x and smallest ≥ x
  let floor = null, ceil = null; // answers
  while (root) { // walk down
    if (root.val === x) return { floor: x, ceil: x }; // exact match
    if (root.val < x) { floor = root.val; root = root.right; } // candidate floor, look for bigger
    else { ceil = root.val; root = root.left; } // candidate ceil, look for smaller
  } // end while
  return { floor, ceil }; // results
} // end floorCeil

function inorderSuccessor(root, val) { // next larger key
  let succ = null; // best candidate
  while (root) { if (val < root.val) { succ = root.val; root = root.left; } else root = root.right; } // go left when node is a candidate
  return succ; // successor value
} // end inorderSuccessor

let root = null; // empty BST
[50, 30, 70, 20, 40, 60, 80].forEach(v => (root = insert(root, v))); // build tree
console.log('inorder (sorted)  =', inorder(root).join(' ')); // 20 30 40 50 60 70 80
console.log('search(60)        =', !!search(root, 60)); // true
console.log('kthSmallest(3)    =', kthSmallest(root, 3)); // 40
console.log('floorCeil(65)     =', floorCeil(root, 65)); // {floor:60, ceil:70}
console.log('successor(40)     =', inorderSuccessor(root, 40)); // 50
root = remove(root, 50); // delete root with two children
console.log('after remove(50)  =', inorder(root).join(' '), '| root now', root.val); // root becomes 60
console.log('isValidBST        =', isValidBST(root)); // true
