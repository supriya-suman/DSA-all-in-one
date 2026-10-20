/**
 * TERM: Strongly Connected Components (Kosaraju's & Tarjan's Algorithms)
 * DEFINITION: An SCC is a maximal set of vertices in a directed graph where every vertex can reach every other; Kosaraju uses two DFS passes, Tarjan uses one DFS with low-link values; both O(V + E).
 * RELATED TERMS:
 *   - Transpose graph: reverse every edge (used by Kosaraju).
 *   - Low-link value: smallest discovery time reachable from a node's subtree (used by Tarjan).
 *   - Condensation graph: SCCs collapsed into single nodes form a DAG.
 * RUN: node 12-graphs/11-strongly-connected-components.js
 */

function kosaraju(n, edges) { // two passes
  const adj = Array.from({ length: n }, () => []), radj = Array.from({ length: n }, () => []); // graph and its transpose
  edges.forEach(([u, v]) => { adj[u].push(v); radj[v].push(u); }); // build both
  const seen = new Array(n).fill(false), order = []; // visited and finish order
  const dfs1 = (u) => { seen[u] = true; for (const v of adj[u]) if (!seen[v]) dfs1(v); order.push(u); }; // record finish order
  for (let i = 0; i < n; i++) if (!seen[i]) dfs1(i); // pass 1 on original graph
  const comp = new Array(n).fill(-1), sccs = []; // component id per vertex
  const dfs2 = (u, id) => { comp[u] = id; sccs[id].push(u); for (const v of radj[u]) if (comp[v] === -1) dfs2(v, id); }; // collect one SCC
  for (let i = order.length - 1; i >= 0; i--) { const u = order[i]; if (comp[u] === -1) { sccs.push([]); dfs2(u, sccs.length - 1); } } // pass 2 on transpose in reverse finish order
  return sccs; // list of SCCs
} // end kosaraju

function tarjan(n, edges) { // single pass
  const adj = Array.from({ length: n }, () => []); edges.forEach(([u, v]) => adj[u].push(v)); // graph
  const disc = new Array(n).fill(-1), low = new Array(n).fill(0), onStack = new Array(n).fill(false), st = [], sccs = []; let time = 0; // bookkeeping
  const dfs = (u) => { // visit u
    disc[u] = low[u] = time++; st.push(u); onStack[u] = true; // discovery time and push
    for (const v of adj[u]) { // explore edges
      if (disc[v] === -1) { dfs(v); low[u] = Math.min(low[u], low[v]); } // tree edge: inherit child's low
      else if (onStack[v]) low[u] = Math.min(low[u], disc[v]); // back edge to a node in the current SCC
    } // end for
    if (low[u] === disc[u]) { const comp = []; let w; do { w = st.pop(); onStack[w] = false; comp.push(w); } while (w !== u); sccs.push(comp); } // u is the root of an SCC
  }; // end dfs
  for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i); // cover all vertices
  return sccs; // list of SCCs
} // end tarjan

const edges = [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4], [4, 5], [5, 3], [6, 5], [6, 7]]; // sample directed graph
console.log('Kosaraju SCCs =', JSON.stringify(kosaraju(8, edges))); // {0,1,2} {3,4,5} {6} {7}
console.log('Tarjan SCCs   =', JSON.stringify(tarjan(8, edges))); // same groups, different order
