/**
 * TERM: Tree Construction & Serialization
 * DEFINITION: Rebuilding a binary tree from traversal orders (e.g. preorder + inorder) and converting a tree to/from a string (serialize/deserialize).
 * RELATED TERMS:
 *   - A unique binary tree needs inorder + (preorder or postorder); preorder + postorder alone is ambiguous.
 *   - Serialization: encode structure, including null markers, so it can be stored or sent.
 *   - N-ary tree: each node can have any number of children.
 * RUN: node 09-trees/07-tree-construction-and-serialization.js
 */

const { TreeNode, inorder } = require('../_shared/tree-utils'); // shared helpers

function buildFromPreIn(pre, ino) { // O(n) with index map
  const pos = new Map(ino.map((v, i) => [v, i])); let p = 0; // value → inorder index, pointer into preorder
  const build = (lo, hi) => { // build subtree from ino[lo..hi]
    if (lo > hi) return null; // empty range
    const val = pre[p++], node = new TreeNode(val); // next preorder value is the root
    const mid = pos.get(val); // split inorder at root
    node.left = build(lo, mid - 1); // left part of inorder
    node.right = build(mid + 1, hi); // right part of inorder
    return node; // subtree root
  }; // end build
  return build(0, ino.length - 1); // whole range
} // end buildFromPreIn

function buildFromPostIn(post, ino) { // root comes last in postorder
  const pos = new Map(ino.map((v, i) => [v, i])); let p = post.length - 1; // read postorder backwards
  const build = (lo, hi) => { if (lo > hi) return null; const node = new TreeNode(post[p--]); const mid = pos.get(node.val); node.right = build(mid + 1, hi); node.left = build(lo, mid - 1); return node; }; // build right first
  return build(0, ino.length - 1); // whole tree
} // end buildFromPostIn

function serialize(root) { // preorder with '#' for null
  const out = []; // tokens
  const dfs = (n) => { if (!n) { out.push('#'); return; } out.push(n.val); dfs(n.left); dfs(n.right); }; // record node then children
  dfs(root); return out.join(','); // comma-separated string
} // end serialize

function deserialize(data) { // inverse of serialize
  const tokens = data.split(','); let i = 0; // token stream
  const build = () => { const t = tokens[i++]; if (t === '#') return null; const n = new TreeNode(Number(t)); n.left = build(); n.right = build(); return n; }; // same order as serialize
  return build(); // rebuilt root
} // end deserialize

class NaryNode { constructor(val, children = []) { this.val = val; this.children = children; } } // node with many children
const naryLevelOrder = (root) => { const res = [], q = [root]; while (q.length) { const size = q.length, lvl = []; for (let i = 0; i < size; i++) { const n = q.shift(); lvl.push(n.val); q.push(...n.children); } res.push(lvl); } return res; }; // BFS on N-ary tree

const t1 = buildFromPreIn([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]); // rebuild tree
console.log('pre+in → inorder  =', inorder(t1).join(' ')); // 9 3 15 20 7
const t2 = buildFromPostIn([9, 15, 7, 20, 3], [9, 3, 15, 20, 7]); // same tree from postorder
console.log('post+in → root    =', t2.val, '| left', t2.left.val, '| right', t2.right.val); // 3 9 20
const s = serialize(t1); // tree → string
console.log('serialize         =', s); // 3,9,#,#,20,15,#,#,7,#,#
console.log('deserialize→ser   =', serialize(deserialize(s)) === s); // true (round trip)
console.log('N-ary level order =', JSON.stringify(naryLevelOrder(new NaryNode(1, [new NaryNode(3, [new NaryNode(5), new NaryNode(6)]), new NaryNode(2), new NaryNode(4)])))); // [[1],[3,2,4],[5,6]]
