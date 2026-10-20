/**
 * TERM: Binary Tree & Tree Traversals
 * DEFINITION: A binary tree is a hierarchy where each node has at most two children (left and right); traversal means visiting every node in a defined order.
 * RELATED TERMS:
 *   - Root, Parent, Child, Leaf (no children), Sibling, Edge, Subtree, Depth (edges from root), Height (edges to deepest leaf), Level.
 *   - Full binary tree: every node has 0 or 2 children.  Complete: all levels full except possibly the last, filled left-to-right.
 *   - Perfect: all internal nodes have 2 children and all leaves are at the same level.  Degenerate (skewed): every node has one child.
 *   - DFS traversals: Preorder (Root-Left-Right), Inorder (Left-Root-Right), Postorder (Left-Right-Root).
 *   - BFS / Level-order traversal: visit level by level with a queue.
 *   - Morris traversal: inorder traversal in O(1) extra space using temporary threads.
 * RUN: node 09-trees/01-binary-tree-traversals.js
 */

class TreeNode { constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; } } // binary tree node

function buildFromLevelOrder(arr) { // array like [1,2,3,null,5] → tree (LeetCode style)
  if (!arr.length || arr[0] === null) return null; // empty tree
  const root = new TreeNode(arr[0]), q = [root]; let i = 1; // queue of nodes awaiting children
  while (q.length && i < arr.length) { // attach children in order
    const node = q.shift(); // next parent
    if (arr[i] !== null && arr[i] !== undefined) { node.left = new TreeNode(arr[i]); q.push(node.left); } i++; // left child
    if (i < arr.length && arr[i] !== null) { node.right = new TreeNode(arr[i]); q.push(node.right); } i++; // right child
  } // end while
  return root; // tree root
} // end buildFromLevelOrder

const preorder = (n, out = []) => { if (n) { out.push(n.val); preorder(n.left, out); preorder(n.right, out); } return out; }; // Root, Left, Right
const inorder = (n, out = []) => { if (n) { inorder(n.left, out); out.push(n.val); inorder(n.right, out); } return out; }; // Left, Root, Right
const postorder = (n, out = []) => { if (n) { postorder(n.left, out); postorder(n.right, out); out.push(n.val); } return out; }; // Left, Right, Root

function preorderIterative(root) { // explicit stack instead of recursion
  const out = [], st = root ? [root] : []; // start with root
  while (st.length) { const n = st.pop(); out.push(n.val); if (n.right) st.push(n.right); if (n.left) st.push(n.left); } // push right first so left is processed first
  return out; // preorder list
} // end preorderIterative

function inorderIterative(root) { // go left as far as possible, then visit, then go right
  const out = [], st = []; let cur = root; // stack and current pointer
  while (cur || st.length) { // nodes left to process
    while (cur) { st.push(cur); cur = cur.left; } // dive left
    cur = st.pop(); out.push(cur.val); // visit
    cur = cur.right; // move to right subtree
  } // end while
  return out; // inorder list
} // end inorderIterative

function postorderIterative(root) { // reverse of (Root, Right, Left)
  const out = [], st = root ? [root] : []; // stack
  while (st.length) { const n = st.pop(); out.push(n.val); if (n.left) st.push(n.left); if (n.right) st.push(n.right); } // produce Root-Right-Left
  return out.reverse(); // reversing gives Left-Right-Root
} // end postorderIterative

function levelOrder(root) { // BFS level by level
  const res = [], q = root ? [root] : []; // queue
  while (q.length) { // each loop handles one level
    const size = q.length, level = []; // nodes in this level
    for (let i = 0; i < size; i++) { const n = q.shift(); level.push(n.val); if (n.left) q.push(n.left); if (n.right) q.push(n.right); } // visit and enqueue children
    res.push(level); // save level
  } // end while
  return res; // list of levels
} // end levelOrder

function morrisInorder(root) { // O(n) time, O(1) space
  const out = []; let cur = root; // no stack used
  while (cur) { // walk tree
    if (!cur.left) { out.push(cur.val); cur = cur.right; continue; } // no left → visit and go right
    let pred = cur.left; while (pred.right && pred.right !== cur) pred = pred.right; // inorder predecessor
    if (!pred.right) { pred.right = cur; cur = cur.left; } // create thread back to cur, go left
    else { pred.right = null; out.push(cur.val); cur = cur.right; } // thread exists → remove it, visit, go right
  } // end while
  return out; // inorder list
} // end morrisInorder

const root = buildFromLevelOrder([1, 2, 3, 4, 5, 6, 7]); // perfect tree of 7 nodes
console.log('preorder           =', preorder(root).join(' ')); // 1 2 4 5 3 6 7
console.log('inorder            =', inorder(root).join(' ')); // 4 2 5 1 6 3 7
console.log('postorder          =', postorder(root).join(' ')); // 4 5 2 6 7 3 1
console.log('preorderIterative  =', preorderIterative(root).join(' ')); // same as preorder
console.log('inorderIterative   =', inorderIterative(root).join(' ')); // same as inorder
console.log('postorderIterative =', postorderIterative(root).join(' ')); // same as postorder
console.log('levelOrder (BFS)   =', JSON.stringify(levelOrder(root))); // [[1],[2,3],[4,5,6,7]]
console.log('morrisInorder      =', morrisInorder(root).join(' ')); // 4 2 5 1 6 3 7

