/**
 * TERM: Grid / 2D Dynamic Programming
 * DEFINITION: Grid DP computes an answer for each cell from its neighbouring cells (usually top and left), e.g. counting paths or finding minimum path cost.
 * RELATED TERMS:
 *   - Unique paths, unique paths with obstacles, minimum path sum, maximal square, dungeon game.
 * RUN: node 13-dynamic-programming/06-grid-dp.js
 */

function uniquePaths(m, n) { // moves only right or down
  const dp = new Array(n).fill(1); // first row: one way to each cell
  for (let r = 1; r < m; r++) for (let c = 1; c < n; c++) dp[c] += dp[c - 1]; // from top (old dp[c]) + from left (dp[c-1])
  return dp[n - 1]; // bottom-right
} // end uniquePaths

function uniquePathsWithObstacles(g) { // 1 = obstacle
  const dp = new Array(g[0].length).fill(0); dp[0] = 1; // start cell
  for (const row of g) for (let c = 0; c < row.length; c++) { if (row[c] === 1) dp[c] = 0; else if (c > 0) dp[c] += dp[c - 1]; } // blocked cells have 0 ways
  return dp[dp.length - 1]; // ways
} // end uniquePathsWithObstacles

function minPathSum(g) { // cheapest path top-left → bottom-right
  const R = g.length, C = g[0].length, dp = g.map(r => [...r]); // copy grid as table
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) { if (r === 0 && c === 0) continue; dp[r][c] += Math.min(r ? dp[r - 1][c] : Infinity, c ? dp[r][c - 1] : Infinity); } // add cheaper of top/left
  return dp[R - 1][C - 1]; // minimum sum
} // end minPathSum

function maximalSquare(m) { // largest square of 1s
  let best = 0; const dp = m.map(r => r.map(() => 0)); // dp[r][c] = side of square ending at (r,c)
  for (let r = 0; r < m.length; r++) for (let c = 0; c < m[0].length; c++) if (m[r][c] === 1) { dp[r][c] = r && c ? 1 + Math.min(dp[r - 1][c], dp[r][c - 1], dp[r - 1][c - 1]) : 1; best = Math.max(best, dp[r][c]); } // limited by smallest neighbour
  return best * best; // area
} // end maximalSquare

function cherryPickupStyleMaxGold(g) { // max collected moving right/down
  const dp = g.map(r => [...r]); // table
  for (let r = 0; r < g.length; r++) for (let c = 0; c < g[0].length; c++) if (r || c) dp[r][c] += Math.max(r ? dp[r - 1][c] : -Infinity, c ? dp[r][c - 1] : -Infinity); // best of top/left
  return dp[g.length - 1][g[0].length - 1]; // total gold
} // end cherryPickupStyleMaxGold

console.log('uniquePaths(3,7)          =', uniquePaths(3, 7)); // 28
console.log('uniquePathsWithObstacles  =', uniquePathsWithObstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]])); // 2
console.log('minPathSum                =', minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]])); // 7
console.log('maximalSquare             =', maximalSquare([[1, 0, 1, 0, 0], [1, 0, 1, 1, 1], [1, 1, 1, 1, 1], [1, 0, 0, 1, 0]])); // 4
console.log('max gold path             =', cherryPickupStyleMaxGold([[0, 6, 0], [5, 8, 7], [0, 9, 0]])); // 23
