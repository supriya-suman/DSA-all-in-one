/**
 * TERM: A* Search & 0-1 BFS
 * DEFINITION: A* finds a shortest path faster than Dijkstra by ordering nodes by f = g (cost so far) + h (heuristic estimate to goal); 0-1 BFS finds shortest paths when edge weights are only 0 or 1 using a deque in O(V + E).
 * RELATED TERMS:
 *   - Heuristic: estimate of remaining cost.  Admissible heuristic: never overestimates (keeps A* optimal).
 *   - Manhattan distance: |dx| + |dy|, admissible for 4-direction grids.
 * RUN: node 12-graphs/13-a-star-and-01-bfs.js
 */

const { MinHeap } = require('../_shared/min-heap'); // priority queue

function aStarGrid(grid, start, goal) { // 0 = open, 1 = wall, unit step cost
  const key = (r, c) => r * grid[0].length + c; // unique id per cell
  const h = (r, c) => Math.abs(r - goal[0]) + Math.abs(c - goal[1]); // Manhattan heuristic
  const g = new Map([[key(...start), 0]]); // best known cost from start
  const pq = new MinHeap((a, b) => a[0] - b[0]); pq.push([h(...start), start[0], start[1]]); // order by f = g + h
  let expanded = 0; // how many cells we processed
  while (pq.size()) { // search
    const [, r, c] = pq.pop(); expanded++; // most promising cell
    if (r === goal[0] && c === goal[1]) return { cost: g.get(key(r, c)), expanded }; // reached goal
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { // neighbours
      const nr = r + dr, nc = c + dc; if (grid[nr]?.[nc] !== 0) continue; // skip walls and outside cells
      const ng = g.get(key(r, c)) + 1; // tentative cost
      if (ng < (g.get(key(nr, nc)) ?? Infinity)) { g.set(key(nr, nc), ng); pq.push([ng + h(nr, nc), nr, nc]); } // better path found
    } // end for
  } // end while
  return { cost: -1, expanded }; // unreachable
} // end aStarGrid

function zeroOneBFS(n, edges, src) { // weights are 0 or 1
  const adj = Array.from({ length: n }, () => []); edges.forEach(([u, v, w]) => adj[u].push([v, w])); // directed graph
  const dist = new Array(n).fill(Infinity); dist[src] = 0; const dq = [src]; // deque as array
  while (dq.length) { // process
    const u = dq.shift(); // front has smallest distance
    for (const [v, w] of adj[u]) if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; w === 0 ? dq.unshift(v) : dq.push(v); } // 0-edge → front, 1-edge → back
  } // end while
  return dist; // shortest distances
} // end zeroOneBFS

const grid = [[0, 0, 0, 0], [1, 1, 0, 1], [0, 0, 0, 0], [0, 1, 1, 0]]; // maze
console.log('A* result   =', aStarGrid(grid, [0, 0], [3, 3])); // cost 6
console.log('0-1 BFS     =', zeroOneBFS(4, [[0, 1, 1], [0, 2, 0], [2, 1, 0], [1, 3, 1]], 0)); // [0,0,0,1]
