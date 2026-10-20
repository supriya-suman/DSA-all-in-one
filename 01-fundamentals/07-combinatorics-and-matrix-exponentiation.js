/**
 * TERM: Combinatorics (nCr, Pascal's Triangle, Catalan Numbers) & Matrix Exponentiation
 * DEFINITION: Combinatorics counts arrangements and selections; matrix exponentiation raises a transition matrix to a power in O(k³ log n) to compute linear recurrences like Fibonacci fast.
 * RELATED TERMS:
 *   - Permutation nPr = n!/(n-r)!: ordered selections.  Combination nCr = n!/(r!(n-r)!): unordered selections.
 *   - Pascal's identity: C(n, r) = C(n-1, r-1) + C(n-1, r).
 *   - Catalan number C_n = C(2n, n)/(n+1): counts BSTs, valid parentheses, triangulations.
 *   - Pigeonhole principle: n+1 items in n boxes → some box has ≥ 2 items.
 * RUN: node 01-fundamentals/07-combinatorics-and-matrix-exponentiation.js
 */

const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1)); // n!
const nPr = (n, r) => factorial(n) / factorial(n - r); // ordered selections
function nCr(n, r) { r = Math.min(r, n - r); let res = 1; for (let i = 1; i <= r; i++) res = (res * (n - r + i)) / i; return Math.round(res); } // multiplicative formula avoids huge factorials

function pascalTriangle(rows) { // C(n, r) table
  const t = []; // rows of the triangle
  for (let n = 0; n < rows; n++) { const row = [1]; for (let r = 1; r < n; r++) row.push(t[n - 1][r - 1] + t[n - 1][r]); if (n > 0) row.push(1); t.push(row); } // Pascal's identity
  return t; // triangle
} // end pascalTriangle

function catalan(n) { // DP: C(i) = sum C(j) * C(i-1-j)
  const c = new Array(n + 1).fill(0); c[0] = 1; // C0 = 1
  for (let i = 1; i <= n; i++) for (let j = 0; j < i; j++) c[i] += c[j] * c[i - 1 - j]; // choose root j, left/right subtrees
  return c[n]; // n-th Catalan number
} // end catalan

function matMul(A, B) { // multiply square BigInt matrices
  return A.map((row, i) => B[0].map((_, j) => row.reduce((s, _, k) => s + A[i][k] * B[k][j], 0n))); // standard row × column
} // end matMul

function matPow(M, p) { // binary exponentiation on matrices
  let R = M.map((row, i) => row.map((_, j) => (i === j ? 1n : 0n))); // identity matrix
  while (p > 0) { if (p & 1) R = matMul(R, M); M = matMul(M, M); p >>= 1; } // square-and-multiply
  return R; // M^p
} // end matPow

const fibMatrix = (n) => (n === 0 ? 0n : matPow([[1n, 1n], [1n, 0n]], n - 1)[0][0]); // [[1,1],[1,0]]^(n-1) top-left = F(n)

console.log('5P2 / 5C2        =', nPr(5, 2), '/', nCr(5, 2)); // 20 / 10
console.log('Pascal rows      =', JSON.stringify(pascalTriangle(5))); // [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log('Catalan 0..7     =', Array.from({ length: 8 }, (_, i) => catalan(i)).join(' ')); // 1 1 2 5 14 42 132 429
console.log('unique BSTs n=4  =', catalan(4)); // 14
console.log('fib(90) matrix   =', fibMatrix(90).toString()); // 2880067194370816120
console.log('pigeonhole demo  = 13 people → at least two share a birth month:', 13 > 12); // true
