/**
 * SHARED HELPER (not a lesson): TreeNode class and a builder used by the tree files.
 * DEFINITION: Builds a binary tree from a level-order array such as [1, 2, 3, null, 5] (null = missing child).
 */

class TreeNode { constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; } } // binary tree node

function buildFromLevelOrder(arr) { // array → tree
  if (!arr.length || arr[0] === null) return null; // empty tree
  const root = new TreeNode(arr[0]), q = [root]; let i = 1; // queue of parents waiting for children
  while (q.length && i < arr.length) { // attach children in order
    const node = q.shift(); // next parent
    if (arr[i] !== null && arr[i] !== undefined) { node.left = new TreeNode(arr[i]); q.push(node.left); } i++; // left child
    if (i < arr.length && arr[i] !== null) { node.right = new TreeNode(arr[i]); q.push(node.right); } i++; // right child
  } // end while
  return root; // finished tree
} // end buildFromLevelOrder

const inorder = (n, out = []) => { if (n) { inorder(n.left, out); out.push(n.val); inorder(n.right, out); } return out; }; // Left, Root, Right

module.exports = { TreeNode, buildFromLevelOrder, inorder }; // export helpers
