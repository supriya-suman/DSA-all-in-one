/**
 * TERM: Depth-First Search (DFS)
 * DEFINITION: DFS explores as deep as possible along one branch before backtracking, using recursion or an explicit stack; O(V + E).
 * RELATED TERMS:
 *   - Connected components: groups found by starting a DFS from every unvisited node.
 *   - Flood fill / Number of islands: DFS on a grid.
 *   - Discovery / finish time: when DFS enters / leaves a node (used in SCC and topological sort).
 *   - Edge types: tree, back, forward, cross edges.
 * RUN: node 12-graphs/03-depth-first-search.js
 */

function dfsRecursive(adj, u, visited = new Set(), order = []) { // recursive DFS
  visited.add(u); order.push(u); // visit u
  for (const v of adj[u]) if (!visited.has(v)) dfsRecursive(adj, v, visited, order); // go deep into each unvisited neighbour
  return order; // visit order
} // end dfsRecursive

function dfsIterative(adj, src) { // explicit stack
  const visited = new Set(), order = [], st = [src]; // stack starts with source
  while (st.length) { // until stack empty
    const u = st.pop(); if (visited.has(u)) continue; // skip already-visited
    visited.add(u); order.push(u); // visit
    for (let i = adj[u].length - 1; i >= 0; i--) if (!visited.has(adj[u][i])) st.push(adj[u][i]); // push in reverse to match recursive order
  } // end while
  return order; // visit order
} // end dfsIterative

function connectedComponents(n, edges) { // count and list components
  const adj = Array.from({ length: n }, () => []); edges.forEach(([u, v]) => { adj[u].push(v); adj[v].push(u); }); // build graph
  const seen = new Set(), comps = []; // visited and result
  for (let i = 0; i < n; i++) if (!seen.has(i)) comps.push(dfsRecursive(adj, i, seen, [])); // new DFS = new component
  return comps; // list of components
} // end connectedComponents

function numIslands(grid) { // '1' = land, '0' = water
  let count = 0; // islands found
  const sink = (r, c) => { if (grid[r]?.[c] !== '1') return; grid[r][c] = '0'; sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1); }; // flood fill the island
  for (let r = 0; r < grid.length; r++) for (let c = 0; c < grid[0].length; c++) if (grid[r][c] === '1') { count++; sink(r, c); } // each unvisited land starts an island
  return count; // number of islands
} // end numIslands

function allPaths(adj, s, t, path = [s], res = []) { // all paths in a DAG via DFS + backtracking
  if (s === t) { res.push([...path]); return res; } // reached target
  for (const v of adj[s]) { path.push(v); allPaths(adj, v, t, path, res); path.pop(); } // explore and undo
  return res; // every path
} // end allPaths

const adj = [[1, 2], [0, 3, 4], [0, 4], [1, 5], [1, 2, 5], [3, 4]]; // sample graph
console.log('dfsRecursive        =', dfsRecursive(adj, 0).join(' ')); // 0 1 3 5 4 2
console.log('dfsIterative        =', dfsIterative(adj, 0).join(' ')); // 0 1 3 5 4 2
console.log('connectedComponents =', JSON.stringify(connectedComponents(5, [[0, 1], [1, 2], [3, 4]]))); // [[0,1,2],[3,4]]
console.log('numIslands          =', numIslands([['1', '1', '0', '0'], ['1', '0', '0', '1'], ['0', '0', '1', '1']])); // 2
console.log('allPaths 0→3 (DAG)  =', JSON.stringify(allPaths([[1, 2], [3], [3], []], 0, 3))); // [[0,1,3],[0,2,3]]
