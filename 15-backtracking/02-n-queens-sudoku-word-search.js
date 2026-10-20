/**
 * TERM: Constraint Backtracking (N-Queens, Sudoku Solver, Word Search, Rat in a Maze)
 * DEFINITION: Classic backtracking puzzles that place choices one at a time, check constraints, and undo invalid placements.
 * RELATED TERMS:
 *   - Constraint satisfaction problem (CSP).
 *   - Diagonals in N-Queens: (row - col) and (row + col) are constant along each diagonal.
 *   - Branch and bound: backtracking that also prunes using a bound on the best possible result.
 * RUN: node 15-backtracking/02-n-queens-sudoku-word-search.js
 */

function solveNQueens(n) { // all boards with n non-attacking queens
  const res = [], cols = new Set(), d1 = new Set(), d2 = new Set(), board = Array.from({ length: n }, () => new Array(n).fill('.')); // attacked columns/diagonals
  const bt = (r) => { // place queen in row r
    if (r === n) { res.push(board.map(row => row.join(''))); return; } // all rows filled
    for (let c = 0; c < n; c++) { // try every column
      if (cols.has(c) || d1.has(r - c) || d2.has(r + c)) continue; // square under attack
      cols.add(c); d1.add(r - c); d2.add(r + c); board[r][c] = 'Q'; // place queen
      bt(r + 1); // next row
      cols.delete(c); d1.delete(r - c); d2.delete(r + c); board[r][c] = '.'; // remove queen (backtrack)
    } // end for
  }; // end bt
  bt(0); return res; // solutions
} // end solveNQueens

function solveSudoku(b) { // '.' = empty cell; solves in place
  const ok = (r, c, ch) => { for (let i = 0; i < 9; i++) { if (b[r][i] === ch || b[i][c] === ch) return false; const br = 3 * Math.floor(r / 3) + Math.floor(i / 3), bc = 3 * Math.floor(c / 3) + (i % 3); if (b[br][bc] === ch) return false; } return true; }; // row, column and 3x3 box check
  const bt = () => { for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) if (b[r][c] === '.') { for (let d = 1; d <= 9; d++) { const ch = String(d); if (ok(r, c, ch)) { b[r][c] = ch; if (bt()) return true; b[r][c] = '.'; } } return false; } return true; }; // fill first empty cell, backtrack on failure
  bt(); return b; // solved board
} // end solveSudoku

function wordSearch(grid, word) { // word built from adjacent cells, each used once
  const R = grid.length, C = grid[0].length; // dimensions
  const dfs = (r, c, i) => { // match word[i] at (r,c)
    if (i === word.length) return true; // matched everything
    if (r < 0 || c < 0 || r >= R || c >= C || grid[r][c] !== word[i]) return false; // out of bounds or mismatch
    const tmp = grid[r][c]; grid[r][c] = '#'; // mark visited
    const found = dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) || dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1); // explore neighbours
    grid[r][c] = tmp; return found; // unmark (backtrack)
  }; // end dfs
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (dfs(r, c, 0)) return true; // try every start
  return false; // not found
} // end wordSearch

function ratInMaze(m) { // paths from top-left to bottom-right using D, L, R, U
  const n = m.length, res = [], seen = m.map(r => r.map(() => false)); // visited grid
  const bt = (r, c, path) => { if (r === n - 1 && c === n - 1) { res.push(path); return; } for (const [dr, dc, ch] of [[1, 0, 'D'], [0, -1, 'L'], [0, 1, 'R'], [-1, 0, 'U']]) { const nr = r + dr, nc = c + dc; if (m[nr]?.[nc] === 1 && !seen[nr][nc]) { seen[nr][nc] = true; bt(nr, nc, path + ch); seen[nr][nc] = false; } } }; // move, recurse, undo
  if (m[0][0] === 1) { seen[0][0] = true; bt(0, 0, ''); } return res; // all paths
} // end ratInMaze

console.log('N-Queens(4) solutions =', solveNQueens(4).length, JSON.stringify(solveNQueens(4)[0])); // 2 solutions
console.log('N-Queens(8) count     =', solveNQueens(8).length); // 92
const sudoku = ['53..7....', '6..195...', '.98....6.', '8...6...3', '4..8.3..1', '7...2...6', '.6....28.', '...419..5', '....8..79'].map(r => r.split('')); // puzzle
console.log('Sudoku first row      =', solveSudoku(sudoku)[0].join('')); // 534678912
console.log('wordSearch(ABCCED)    =', wordSearch([['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'ABCCED')); // true
console.log('ratInMaze             =', ratInMaze([[1, 0, 0, 0], [1, 1, 0, 1], [1, 1, 0, 0], [0, 1, 1, 1]])); // [DDRDRR, DRDDRR]
