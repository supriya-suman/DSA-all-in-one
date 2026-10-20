/**
 * TERM: Tree Properties (Height, Diameter, Balance, Max Path Sum) & Tree Views
 * DEFINITION: Common recursive measurements of a binary tree and the "views" (left, right, top, bottom, zigzag) seen from different sides.
 * RELATED TERMS:
 *   - Diameter: longest path (in edges) between any two nodes.
 *   - Height-balanced tree: for every node, left and right heights differ by at most 1.
 *   - Mirror / symmetric tree, Maximum path sum, Horizontal distance (used for top/bottom view).
 * RUN: node 09-trees/02-tree-properties-and-views.js
 */

const { buildFromLevelOrder } = require('../_shared/tree-utils'); // tree builder helper

const height = (n) => (n ? 1 + Math.max(height(n.left), height(n.right)) : 0); // height in nodes
const countNodes = (n) => (n ? 1 + countNodes(n.left) + countNodes(n.right) : 0); // total nodes
const countLeaves = (n) => (!n ? 0 : !n.left && !n.right ? 1 : countLeaves(n.left) + countLeaves(n.right)); // nodes with no children

function diameter(root) { // longest path in edges
  let best = 0; // global best
  const depth = (n) => { if (!n) return 0; const l = depth(n.left), r = depth(n.right); best = Math.max(best, l + r); return 1 + Math.max(l, r); }; // path through n = l + r
  depth(root); // run DFS
  return best; // diameter
} // end diameter

function isBalanced(root) { // returns -1 when unbalanced to stop early
  const check = (n) => { if (!n) return 0; const l = check(n.left); if (l < 0) return -1; const r = check(n.right); if (r < 0 || Math.abs(l - r) > 1) return -1; return 1 + Math.max(l, r); }; // height or -1
  return check(root) >= 0; // balanced if no -1
} // end isBalanced

function isSymmetric(root) { // mirror of itself
  const mirror = (a, b) => (!a && !b) || (a && b && a.val === b.val && mirror(a.left, b.right) && mirror(a.right, b.left)); // compare outer and inner pairs
  return !root || mirror(root.left, root.right); // check subtrees
} // end isSymmetric

function maxPathSum(root) { // any path, any start/end
  let best = -Infinity; // global best
  const gain = (n) => { if (!n) return 0; const l = Math.max(0, gain(n.left)), r = Math.max(0, gain(n.right)); best = Math.max(best, n.val + l + r); return n.val + Math.max(l, r); }; // ignore negative branches
  gain(root); // DFS
  return best; // max sum
} // end maxPathSum

function rightView(root) { // last node of each level
  const res = []; const dfs = (n, d) => { if (!n) return; if (d === res.length) res.push(n.val); dfs(n.right, d + 1); dfs(n.left, d + 1); }; // visit right first
  dfs(root, 0); return res; // first seen per depth
} // end rightView

function leftView(root) { // first node of each level
  const res = []; const dfs = (n, d) => { if (!n) return; if (d === res.length) res.push(n.val); dfs(n.left, d + 1); dfs(n.right, d + 1); }; // visit left first
  dfs(root, 0); return res; // left view
} // end leftView

function topAndBottomView(root) { // uses horizontal distance (hd): left = hd-1, right = hd+1
  const top = new Map(), bottom = new Map(), q = [[root, 0]]; // BFS queue of [node, hd]
  while (q.length) { // level order guarantees top-most seen first
    const [n, hd] = q.shift(); // next node
    if (!top.has(hd)) top.set(hd, n.val); // first node at this hd is visible from top
    bottom.set(hd, n.val); // last node at this hd is visible from bottom
    if (n.left) q.push([n.left, hd - 1]); if (n.right) q.push([n.right, hd + 1]); // children shift hd
  } // end while
  const sorted = (m) => [...m.entries()].sort((a, b) => a[0] - b[0]).map(e => e[1]); // order by hd
  return { top: sorted(top), bottom: sorted(bottom) }; // both views
} // end topAndBottomView

function zigzagLevelOrder(root) { // alternate left→right and right→left
  const res = [], q = root ? [root] : []; let leftToRight = true; // direction flag
  while (q.length) { const size = q.length, lvl = []; for (let i = 0; i < size; i++) { const n = q.shift(); lvl.push(n.val); if (n.left) q.push(n.left); if (n.right) q.push(n.right); } res.push(leftToRight ? lvl : lvl.reverse()); leftToRight = !leftToRight; } // flip each level
  return res; // zigzag levels
} // end zigzagLevelOrder

const t = buildFromLevelOrder([1, 2, 3, 4, 5, 6, 7]); // sample tree
console.log('height / nodes / leaves =', height(t), countNodes(t), countLeaves(t)); // 3 7 4
console.log('diameter                =', diameter(t)); // 4
console.log('isBalanced              =', isBalanced(t)); // true
console.log('isSymmetric             =', isSymmetric(buildFromLevelOrder([1, 2, 2, 3, 4, 4, 3]))); // true
console.log('maxPathSum              =', maxPathSum(buildFromLevelOrder([-10, 9, 20, null, null, 15, 7]))); // 42
console.log('leftView / rightView    =', leftView(t), rightView(t)); // [1,2,4] [1,3,7]
console.log('top / bottom view       =', JSON.stringify(topAndBottomView(t))); // top [4,2,1,3,7] bottom [4,2,6,3,7] (5/6 share hd 0)
console.log('zigzagLevelOrder        =', JSON.stringify(zigzagLevelOrder(t))); // [[1],[3,2],[4,5,6,7]]
