/**
 * TERM: Lowest Common Ancestor (LCA) & Binary Lifting
 * DEFINITION: The LCA of two nodes is the deepest node that has both of them as descendants; binary lifting answers LCA queries in O(log n) after O(n log n) preprocessing.
 * RELATED TERMS:
 *   - Ancestor / Descendant.
 *   - Binary lifting table: up[k][v] = 2^k-th ancestor of v.
 *   - Distance between two nodes = depth(u) + depth(v) - 2*depth(LCA).
 * RUN: node 09-trees/06-lowest-common-ancestor.js
 */

const { buildFromLevelOrder } = require('../_shared/tree-utils'); // tree builder

function lcaBinaryTree(root, p, q) { // recursive O(n) for any binary tree
  if (!root || root.val === p || root.val === q) return root; // found p/q or hit null
  const left = lcaBinaryTree(root.left, p, q), right = lcaBinaryTree(root.right, p, q); // search both sides
  if (left && right) return root; // p and q on different sides → this is LCA
  return left || right; // otherwise pass up whichever side found something
} // end lcaBinaryTree

function lcaBST(root, p, q) { // BST: use ordering, O(h)
  while (root) { // walk down
    if (p < root.val && q < root.val) root = root.left; // both smaller
    else if (p > root.val && q > root.val) root = root.right; // both larger
    else return root; // split point is the LCA
  } // end while
  return null; // not found
} // end lcaBST

class BinaryLifting { // general tree given as adjacency list
  constructor(n, edges, root = 0) { // n nodes 0..n-1
    this.LOG = Math.ceil(Math.log2(n)) + 1; // levels needed
    this.adj = Array.from({ length: n }, () => []); // adjacency list
    for (const [u, v] of edges) { this.adj[u].push(v); this.adj[v].push(u); } // undirected edges
    this.depth = new Array(n).fill(0); // depth of each node
    this.up = Array.from({ length: this.LOG }, () => new Array(n).fill(root)); // up[k][v]
    const stack = [[root, root]]; const seen = new Array(n).fill(false); seen[root] = true; // iterative DFS
    while (stack.length) { // fill direct parents and depths
      const [v, p] = stack.pop(); this.up[0][v] = p; // parent of v
      for (const w of this.adj[v]) if (!seen[w]) { seen[w] = true; this.depth[w] = this.depth[v] + 1; stack.push([w, v]); } // visit children
    } // end while
    for (let k = 1; k < this.LOG; k++) for (let v = 0; v < n; v++) this.up[k][v] = this.up[k - 1][this.up[k - 1][v]]; // 2^k = 2^(k-1) + 2^(k-1)
  } // end constructor
  lca(u, v) { // O(log n) query
    if (this.depth[u] < this.depth[v]) [u, v] = [v, u]; // make u the deeper node
    let diff = this.depth[u] - this.depth[v]; // levels to lift u
    for (let k = 0; diff; k++, diff >>= 1) if (diff & 1) u = this.up[k][u]; // lift by binary decomposition
    if (u === v) return u; // v was an ancestor
    for (let k = this.LOG - 1; k >= 0; k--) if (this.up[k][u] !== this.up[k][v]) { u = this.up[k][u]; v = this.up[k][v]; } // lift both while ancestors differ
    return this.up[0][u]; // parent is the LCA
  } // end lca
  distance(u, v) { return this.depth[u] + this.depth[v] - 2 * this.depth[this.lca(u, v)]; } // path length
} // end BinaryLifting

const tree = buildFromLevelOrder([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]); // classic example
console.log('LCA(5,1) binary tree =', lcaBinaryTree(tree, 5, 1).val); // 3
console.log('LCA(7,4) binary tree =', lcaBinaryTree(tree, 7, 4).val); // 2
const bst = buildFromLevelOrder([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]); // BST example
console.log('LCA(3,5) in BST      =', lcaBST(bst, 3, 5).val); // 4
const bl = new BinaryLifting(7, [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [5, 6]]); // general tree rooted at 0
console.log('binary lifting LCA   =', bl.lca(3, 4), bl.lca(4, 6)); // 1 0
console.log('distance(3,6)        =', bl.distance(3, 6)); // 5
