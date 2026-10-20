/**
 * TERM: Fenwick Tree (Binary Indexed Tree, BIT)
 * DEFINITION: A Fenwick tree stores partial sums in an array indexed by lowest set bits, supporting prefix-sum queries and point updates in O(log n) with less code than a segment tree.
 * RELATED TERMS:
 *   - i & (-i): the lowest set bit, decides how far each index "covers".
 *   - Inversion counting with BIT, range update + point query using a difference BIT.
 * RUN: node 11-advanced-data-structures/03-fenwick-tree.js
 */

class FenwickTree { // 1-indexed internally
  constructor(n) { this.n = n; this.bit = new Array(n + 1).fill(0); } // bit[0] unused
  add(i, delta) { for (i++; i <= this.n; i += i & -i) this.bit[i] += delta; } // climb to every node covering i
  prefixSum(i) { let s = 0; for (i++; i > 0; i -= i & -i) s += this.bit[i]; return s; } // sum of [0..i] by jumping down
  rangeSum(l, r) { return this.prefixSum(r) - (l > 0 ? this.prefixSum(l - 1) : 0); } // sum of [l..r]
  static from(arr) { const f = new FenwickTree(arr.length); arr.forEach((v, i) => f.add(i, v)); return f; } // build O(n log n)
} // end FenwickTree

function countInversionsBIT(arr) { // count pairs i<j with a[i]>a[j]
  const sorted = [...new Set(arr)].sort((a, b) => a - b); // coordinate compression
  const rank = new Map(sorted.map((v, i) => [v, i])); // value → compressed index
  const bit = new FenwickTree(sorted.length); let inv = 0; // counts of values seen
  for (let i = arr.length - 1; i >= 0; i--) { // scan from right
    const r = rank.get(arr[i]); // compressed value
    if (r > 0) inv += bit.prefixSum(r - 1); // smaller values already seen on the right
    bit.add(r, 1); // mark this value as seen
  } // end for
  return inv; // total inversions
} // end countInversionsBIT

const f = FenwickTree.from([3, 2, -1, 6, 5, 4, -3]); // build BIT
console.log('prefixSum(3)   =', f.prefixSum(3)); // 3+2-1+6 = 10
console.log('rangeSum(2,5)  =', f.rangeSum(2, 5)); // -1+6+5+4 = 14
f.add(2, 5); // a[2] += 5
console.log('after add      =', f.rangeSum(2, 5)); // 19
console.log('inversions     =', countInversionsBIT([8, 4, 2, 1])); // 6
