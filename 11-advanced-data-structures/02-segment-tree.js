/**
 * TERM: Segment Tree (with Lazy Propagation)
 * DEFINITION: A segment tree is a binary tree over array ranges where each node stores an aggregate (sum/min/max) of its range, giving O(log n) range queries and updates.
 * RELATED TERMS:
 *   - Point update: change one element.  Range query: aggregate over [l, r].
 *   - Lazy propagation: postpone range updates by storing pending changes at nodes, so range updates are O(log n).
 *   - Size: about 4n nodes for an array of n elements.
 * RUN: node 11-advanced-data-structures/02-segment-tree.js
 */

class SegmentTree { // range sum + range add with lazy propagation
  constructor(arr) { this.n = arr.length; this.tree = new Array(4 * this.n).fill(0); this.lazy = new Array(4 * this.n).fill(0); this.#build(arr, 1, 0, this.n - 1); } // allocate and build

  #build(a, node, l, r) { // fill tree recursively
    if (l === r) { this.tree[node] = a[l]; return; } // leaf stores the element
    const m = (l + r) >> 1; // split point
    this.#build(a, 2 * node, l, m); this.#build(a, 2 * node + 1, m + 1, r); // build children
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1]; // combine
  } // end build

  #push(node, l, r) { // apply pending update to children
    if (!this.lazy[node]) return; // nothing pending
    const m = (l + r) >> 1, v = this.lazy[node]; // split and pending value
    for (const [c, cl, cr] of [[2 * node, l, m], [2 * node + 1, m + 1, r]]) { this.tree[c] += v * (cr - cl + 1); this.lazy[c] += v; } // children absorb the update
    this.lazy[node] = 0; // cleared
  } // end push

  rangeAdd(ql, qr, v, node = 1, l = 0, r = this.n - 1) { // add v to every element in [ql, qr]
    if (qr < l || r < ql) return; // no overlap
    if (ql <= l && r <= qr) { this.tree[node] += v * (r - l + 1); this.lazy[node] += v; return; } // full overlap → store lazily
    this.#push(node, l, r); // partial overlap → push pending first
    const m = (l + r) >> 1; // split
    this.rangeAdd(ql, qr, v, 2 * node, l, m); this.rangeAdd(ql, qr, v, 2 * node + 1, m + 1, r); // recurse
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1]; // recombine
  } // end rangeAdd

  query(ql, qr, node = 1, l = 0, r = this.n - 1) { // sum of [ql, qr]
    if (qr < l || r < ql) return 0; // no overlap contributes 0
    if (ql <= l && r <= qr) return this.tree[node]; // fully covered node
    this.#push(node, l, r); // make children up to date
    const m = (l + r) >> 1; // split
    return this.query(ql, qr, 2 * node, l, m) + this.query(ql, qr, 2 * node + 1, m + 1, r); // combine halves
  } // end query

  pointUpdate(i, value) { const cur = this.query(i, i); this.rangeAdd(i, i, value - cur); } // set a[i] = value
} // end SegmentTree

class MinSegmentTree { // iterative bottom-up segment tree for range minimum
  constructor(a) { this.n = a.length; this.t = new Array(2 * this.n).fill(Infinity); for (let i = 0; i < this.n; i++) this.t[this.n + i] = a[i]; for (let i = this.n - 1; i > 0; i--) this.t[i] = Math.min(this.t[2 * i], this.t[2 * i + 1]); } // leaves at n..2n-1
  update(i, v) { i += this.n; this.t[i] = v; for (i >>= 1; i; i >>= 1) this.t[i] = Math.min(this.t[2 * i], this.t[2 * i + 1]); } // fix ancestors
  query(l, r) { let res = Infinity; for (l += this.n, r += this.n + 1; l < r; l >>= 1, r >>= 1) { if (l & 1) res = Math.min(res, this.t[l++]); if (r & 1) res = Math.min(res, this.t[--r]); } return res; } // min over [l, r]
} // end MinSegmentTree

const st = new SegmentTree([1, 3, 5, 7, 9, 11]); // build sum tree
console.log('sum(1,3)            =', st.query(1, 3)); // 15
st.rangeAdd(0, 2, 10); // add 10 to first three elements
console.log('after add, sum(0,5) =', st.query(0, 5)); // 36 + 30 = 66
st.pointUpdate(5, 0); // a[5] = 0
console.log('after set, sum(3,5) =', st.query(3, 5)); // 7 + 9 + 0 = 16
const mst = new MinSegmentTree([5, 2, 8, 6, 1, 9]); // build min tree
console.log('min(0,3)            =', mst.query(0, 3)); // 2
mst.update(1, 7); // change 2 to 7
console.log('min(0,3) after upd  =', mst.query(0, 3)); // 5
