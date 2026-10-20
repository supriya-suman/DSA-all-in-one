/**
 * TERM: Eulerian Path (Hierholzer's Algorithm) & Maximum Flow (Edmonds-Karp)
 * DEFINITION: An Eulerian path uses every edge exactly once (Hierholzer builds it in O(E)); maximum flow is the most "flow" that can be pushed from source to sink through capacity-limited edges (Edmonds-Karp uses BFS augmenting paths, O(V·E²)).
 * RELATED TERMS:
 *   - Eulerian circuit: Euler path that starts and ends at the same vertex.
 *   - Directed Euler path exists if at most one node has out-in = 1 and one has in-out = 1.
 *   - Hamiltonian path: visits every vertex exactly once (NP-complete; see bitmask DP).
 *   - Residual graph, augmenting path, Ford-Fulkerson method, Max-flow min-cut theorem.
 * RUN: node 12-graphs/14-euler-path-and-max-flow.js
 */

function reconstructItinerary(tickets) { // Euler path on airports, smallest lexical order
  const adj = new Map(); // airport → sorted destinations
  for (const [a, b] of [...tickets].sort((x, y) => (y[1] < x[1] ? -1 : 1))) { if (!adj.has(a)) adj.set(a, []); adj.get(a).push(b); } // reverse-sorted so pop() gives smallest
  const route = [], st = ['JFK']; // Hierholzer with explicit stack
  while (st.length) { // walk edges
    const top = st[st.length - 1]; // current airport
    if (adj.get(top)?.length) st.push(adj.get(top).pop()); // follow an unused edge
    else route.push(st.pop()); // dead end → add to route
  } // end while
  return route.reverse(); // route was built backwards
} // end reconstructItinerary

function edmondsKarp(n, edges, s, t) { // edges: [u, v, capacity]
  const cap = Array.from({ length: n }, () => new Array(n).fill(0)); // residual capacities
  edges.forEach(([u, v, c]) => (cap[u][v] += c)); // add capacities
  let flow = 0; // total flow
  while (true) { // find augmenting paths
    const parent = new Array(n).fill(-1); parent[s] = s; const q = [s]; // BFS for shortest augmenting path
    while (q.length && parent[t] === -1) { const u = q.shift(); for (let v = 0; v < n; v++) if (parent[v] === -1 && cap[u][v] > 0) { parent[v] = u; q.push(v); } } // explore residual edges
    if (parent[t] === -1) break; // no path → done (max-flow min-cut reached)
    let push = Infinity; for (let v = t; v !== s; v = parent[v]) push = Math.min(push, cap[parent[v]][v]); // bottleneck capacity
    for (let v = t; v !== s; v = parent[v]) { cap[parent[v]][v] -= push; cap[v][parent[v]] += push; } // update residual graph (reverse edges allow undoing)
    flow += push; // add path flow
  } // end while
  return flow; // maximum flow
} // end edmondsKarp

console.log('Euler itinerary =', reconstructItinerary([['MUC', 'LHR'], ['JFK', 'MUC'], ['SFO', 'SJC'], ['LHR', 'SFO']]).join(' → ')); // JFK → MUC → LHR → SFO → SJC
console.log('max flow        =', edmondsKarp(6, [[0, 1, 16], [0, 2, 13], [1, 2, 10], [2, 1, 4], [1, 3, 12], [3, 2, 9], [2, 4, 14], [4, 3, 7], [3, 5, 20], [4, 5, 4]], 0, 5)); // 23
