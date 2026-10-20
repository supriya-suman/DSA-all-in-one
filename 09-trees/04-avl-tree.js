/**
 * TERM: AVL Tree (Self-Balancing BST)
 * DEFINITION: An AVL tree is a BST that keeps every node's balance factor in {-1, 0, 1} using rotations, guaranteeing O(log n) operations.
 * RELATED TERMS:
 *   - Balance factor: height(left) - height(right).
 *   - Rotations: Right (LL case), Left (RR case), Left-Right (LR case), Right-Left (RL case).
 *   - Self-balancing BST: AVL, Red-Black, Splay, Treap.
 * RUN: node 09-trees/04-avl-tree.js
 */

class AVLNode { constructor(val) { this.val = val; this.left = null; this.right = null; this.height = 1; } } // node stores its height

const h = (n) => (n ? n.height : 0); // height of possibly-null node
const update = (n) => { n.height = 1 + Math.max(h(n.left), h(n.right)); }; // recompute height
const balanceFactor = (n) => h(n.left) - h(n.right); // > 1 left heavy, < -1 right heavy

function rotateRight(y) { // fixes Left-Left imbalance
  const x = y.left, T2 = x.right; // x becomes new root
  x.right = y; y.left = T2; // rotate pointers
  update(y); update(x); // update heights bottom-up
  return x; // new subtree root
} // end rotateRight

function rotateLeft(x) { // fixes Right-Right imbalance
  const y = x.right, T2 = y.left; // y becomes new root
  y.left = x; x.right = T2; // rotate pointers
  update(x); update(y); // update heights
  return y; // new subtree root
} // end rotateLeft

function insert(node, val) { // BST insert + rebalance on the way up
  if (!node) return new AVLNode(val); // new leaf
  if (val < node.val) node.left = insert(node.left, val); // insert left
  else if (val > node.val) node.right = insert(node.right, val); // insert right
  else return node; // ignore duplicates
  update(node); // refresh height
  const bf = balanceFactor(node); // check balance
  if (bf > 1 && val < node.left.val) return rotateRight(node); // LL case
  if (bf < -1 && val > node.right.val) return rotateLeft(node); // RR case
  if (bf > 1 && val > node.left.val) { node.left = rotateLeft(node.left); return rotateRight(node); } // LR case
  if (bf < -1 && val < node.right.val) { node.right = rotateRight(node.right); return rotateLeft(node); } // RL case
  return node; // already balanced
} // end insert

const preorder = (n, o = []) => { if (n) { o.push(`${n.val}(bf=${balanceFactor(n)})`); preorder(n.left, o); preorder(n.right, o); } return o; }; // show balance factors

let root = null; // empty AVL tree
[10, 20, 30, 40, 50, 25].forEach(v => (root = insert(root, v))); // sorted input would make a plain BST a linked list
console.log('root after inserts =', root.val); // 30
console.log('tree height        =', root.height, '(plain BST would be 5)'); // 3
console.log('preorder with bf   =', preorder(root).join(' ')); // every bf is -1, 0 or 1
