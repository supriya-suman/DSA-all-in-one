/**
 * TERM: Matrix Traversal (Spiral, Rotation, Search)
 * DEFINITION: Matrix problems process a 2D grid by rows and columns, e.g. spiral order traversal, 90° rotation and searching a sorted matrix.
 * RELATED TERMS:
 *   - Row-major order: rows stored one after another.
 *   - Transpose: swap matrix[i][j] with matrix[j][i].
 *   - Staircase search: start at top-right of a sorted matrix and move left/down.
 * RUN: node 02-arrays/07-matrix-problems.js
 */

function spiralOrder(m) { // read matrix in a spiral, O(R*C)
  const res = []; // output
  let top = 0, bottom = m.length - 1, left = 0, right = m[0].length - 1; // boundaries
  while (top <= bottom && left <= right) { // while a layer remains
    for (let c = left; c <= right; c++) res.push(m[top][c]); top++; // left → right on top row
    for (let r = top; r <= bottom; r++) res.push(m[r][right]); right--; // top → bottom on right column
    if (top <= bottom) { for (let c = right; c >= left; c--) res.push(m[bottom][c]); bottom--; } // right → left on bottom row
    if (left <= right) { for (let r = bottom; r >= top; r--) res.push(m[r][left]); left++; } // bottom → top on left column
  } // end while
  return res; // spiral sequence
} // end spiralOrder

function rotate90Clockwise(m) { // in place: transpose then reverse each row
  const n = m.length; // square matrix size
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) [m[i][j], m[j][i]] = [m[j][i], m[i][j]]; // transpose
  for (const row of m) row.reverse(); // mirror horizontally
  return m; // rotated matrix
} // end rotate90Clockwise

function searchSortedMatrix(m, target) { // rows and columns sorted ascending, O(R+C)
  let r = 0, c = m[0].length - 1; // start at top-right corner
  while (r < m.length && c >= 0) { // stay inside grid
    if (m[r][c] === target) return [r, c]; // found it
    if (m[r][c] > target) c--; // value too big → move left
    else r++; // value too small → move down
  } // end while
  return null; // not present
} // end searchSortedMatrix

function setZeroes(m) { // if a cell is 0, zero its row and column
  const rows = new Set(), cols = new Set(); // rows/cols to clear
  m.forEach((row, i) => row.forEach((v, j) => { if (v === 0) { rows.add(i); cols.add(j); } })); // record zeros
  m.forEach((row, i) => row.forEach((_, j) => { if (rows.has(i) || cols.has(j)) m[i][j] = 0; })); // apply
  return m; // result
} // end setZeroes

console.log('spiralOrder        =', spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]).join(' ')); // 1 2 3 6 9 8 7 4 5
console.log('rotate90Clockwise  =', JSON.stringify(rotate90Clockwise([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))); // [[7,4,1],[8,5,2],[9,6,3]]
console.log('searchSortedMatrix =', searchSortedMatrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]], 6)); // [2,1]
console.log('setZeroes          =', JSON.stringify(setZeroes([[1, 1, 1], [1, 0, 1], [1, 1, 1]]))); // middle row/col zeroed
