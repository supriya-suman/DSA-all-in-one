/**
 * TERM: Cycle Detection in Graphs
 * DEFINITION: A cycle is a path that starts and ends at the same vertex; undirected graphs detect it via a visited neighbour that is not the parent, directed graphs via a back edge to a node still on the recursion stack.
 * RELATED TERMS:
 *   - Back edge: edge to an ancestor in the DFS tree.
 *   - Three colours (white/grey/black): unvisited / on stack / finished.
 *   - Kahn's algorithm also detects directed cycles (not all nodes get processed).
 * RUN: node 12-graphs/04-cycle-detection.js
 */

function hasCycleUndirected(n, edges) { // DFS with parent tracking
  const adj = Array.from({ length: n }, () => []); edges.forEach(([u, v]) => { adj[u].push(v); adj[v].push(u); }); // build graph
  const visited = new Array(n).fill(false); // visited flags
  const dfs = (u, parent) => { // returns true if a cycle is found
    visited[u] = true; // mark
    for (const v of adj[u]) { if (!visited[v]) { if (dfs(v, u)) return true; } else if (v !== parent) return true; } // visited non-parent neighbour → cycle
    return false; // no cycle from u
  }; // end dfs
  for (let i = 0; i < n; i++) if (!visited[i] && dfs(i, -1)) return true; // check every component
  return false; // acyclic
} // end hasCycleUndirected

function hasCycleDirected(n, edges) { // three-colour DFS
  const adj = Array.from({ length: n }, () => []); edges.forEach(([u, v]) => adj[u].push(v)); // directed edges
  const WHITE = 0, GREY = 1, BLACK = 2, color = new Array(n).fill(WHITE); // colour states
  const dfs = (u) => { // true if cycle reachable from u
    color[u] = GREY; // u is on the recursion stack
    for (const v of adj[u]) { if (color[v] === GREY) return true; if (color[v] === WHITE && dfs(v)) return true; } // grey neighbour = back edge
    color[u] = BLACK; return false; // finished u
  }; // end dfs
  for (let i = 0; i < n; i++) if (color[i] === WHITE && dfs(i)) return true; // try all nodes
  return false; // DAG
} // end hasCycleDirected

console.log('undirected cycle (triangle) =', hasCycleUndirected(3, [[0, 1], [1, 2], [2, 0]])); // true
console.log('undirected cycle (tree)     =', hasCycleUndirected(4, [[0, 1], [1, 2], [1, 3]])); // false
console.log('directed cycle (0→1→2→0)    =', hasCycleDirected(3, [[0, 1], [1, 2], [2, 0]])); // true
console.log('directed cycle (DAG)        =', hasCycleDirected(4, [[0, 1], [0, 2], [1, 3], [2, 3]])); // false
