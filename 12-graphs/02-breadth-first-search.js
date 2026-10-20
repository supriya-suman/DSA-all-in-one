/**
 * TERM: Breadth-First Search (BFS)
 * DEFINITION: BFS explores a graph level by level from a source using a queue; in an unweighted graph it finds the shortest path (fewest edges).
 * RELATED TERMS:
 *   - Visited set: prevents revisiting nodes.  Frontier: nodes waiting in the queue.
 *   - Multi-source BFS: start from many sources at once (rotting oranges).
 *   - Grid BFS: cells are nodes, 4 or 8 neighbours are edges.
 *   - Complexity: O(V + E).
 * RUN: node 12-graphs/02-breadth-first-search.js
 */

function bfs(adj, src) { // returns order, distance and parent arrays
  const dist = new Array(adj.length).fill(-1), parent = new Array(adj.length).fill(-1), order = []; // -1 = unvisited
  const q = [src]; dist[src] = 0; let head = 0; // queue with head pointer
  while (head < q.length) { // until queue is empty
    const u = q[head++]; order.push(u); // dequeue and visit
    for (const v of adj[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; parent[v] = u; q.push(v); } // discover neighbours one level deeper
  } // end while
  return { order, dist, parent }; // BFS results
} // end bfs

function shortestPath(adj, s, t) { // rebuild path using parents
  const { dist, parent } = bfs(adj, s); if (dist[t] === -1) return null; // unreachable
  const path = []; for (let v = t; v !== -1; v = parent[v]) path.push(v); // walk back from target
  return path.reverse(); // source → target
} // end shortestPath

function shortestPathGrid(grid, [sr, sc], [tr, tc]) { // 0 = open, 1 = wall
  const R = grid.length, C = grid[0].length, dist = grid.map(r => r.map(() => -1)); // distances
  const q = [[sr, sc]]; dist[sr][sc] = 0; let h = 0; // start cell
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]; // 4-directional moves
  while (h < q.length) { const [r, c] = q[h++]; for (const [dr, dc] of dirs) { const nr = r + dr, nc = c + dc; if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] === 0 && dist[nr][nc] === -1) { dist[nr][nc] = dist[r][c] + 1; q.push([nr, nc]); } } } // expand neighbours
  return dist[tr][tc]; // steps or -1
} // end shortestPathGrid

function orangesRotting(grid) { // multi-source BFS: 2 = rotten, 1 = fresh
  const q = []; let fresh = 0, minutes = 0; // all rotten oranges start in the queue
  grid.forEach((row, r) => row.forEach((v, c) => { if (v === 2) q.push([r, c]); if (v === 1) fresh++; })); // collect sources
  while (q.length && fresh) { // each round = one minute
    for (let n = q.length; n > 0; n--) { const [r, c] = q.shift(); for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nr = r + dr, nc = c + dc; if (grid[nr]?.[nc] === 1) { grid[nr][nc] = 2; fresh--; q.push([nr, nc]); } } } // rot neighbours
    minutes++; // one level done
  } // end while
  return fresh ? -1 : minutes; // -1 if some can never rot
} // end orangesRotting

const adj = [[1, 2], [0, 3, 4], [0, 4], [1, 5], [1, 2, 5], [3, 4]]; // undirected graph
const r = bfs(adj, 0); // BFS from 0
console.log('BFS order        =', r.order.join(' ')); // 0 1 2 3 4 5
console.log('distances from 0 =', r.dist); // [0,1,1,2,2,3]
console.log('shortestPath 0→5 =', shortestPath(adj, 0, 5).join(' → ')); // 0 → 1 → 3 → 5
console.log('grid shortest    =', shortestPathGrid([[0, 0, 0], [1, 1, 0], [0, 0, 0]], [0, 0], [2, 0])); // 6
console.log('orangesRotting   =', orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]])); // 4
