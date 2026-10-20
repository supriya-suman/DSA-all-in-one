/**
 * TERM: Sparse Table (Range Minimum Query)
 * DEFINITION: A sparse table precomputes answers for every range of length 2^k so idempotent queries like min/max/gcd on a static array take O(1) after O(n log n) build.
 * RELATED TERMS:
 *   - RMQ (Range Minimum Query).
 *   - Idempotent operation: f(x, x) = x, so overlapping ranges are safe (min, max, gcd).
 * RUN: node 11-advanced-data-structures/04-sparse-table.js
 */

class SparseTable { // static array, min queries
  constructor(a) { // O(n log n) build
    const n = a.length; this.log = new Array(n + 1).fill(0); // log[i] = floor(log2 i)
    for (let i = 2; i <= n; i++) this.log[i] = this.log[i >> 1] + 1; // precompute logs
    this.st = [a.slice()]; // st[0][i] = a[i]
    for (let k = 1; (1 << k) <= n; k++) { // range length 2^k
      const prev = this.st[k - 1], cur = []; // previous level
      for (let i = 0; i + (1 << k) <= n; i++) cur.push(Math.min(prev[i], prev[i + (1 << (k - 1))])); // combine two halves
      this.st.push(cur); // store level k
    } // end for
  } // end constructor
  query(l, r) { // min of a[l..r] in O(1)
    const k = this.log[r - l + 1]; // largest power of two fitting in the range
    return Math.min(this.st[k][l], this.st[k][r - (1 << k) + 1]); // two overlapping blocks cover the range
  } // end query
} // end SparseTable

const sp = new SparseTable([7, 2, 3, 0, 5, 10, 3, 12, 18]); // build table
console.log('min(0,2) =', sp.query(0, 2)); // 2
console.log('min(4,8) =', sp.query(4, 8)); // 3
console.log('min(0,8) =', sp.query(0, 8)); // 0
