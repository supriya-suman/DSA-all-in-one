/**
 * TERM: Dijkstra's Shortest Path Algorithm
 * DEFINITION: Dijkstra finds the shortest distance from one source to all vertices in a graph with non-negative edge weights by always expanding the closest unfinished vertex; O((V + E) log V) with a heap.
 * RELATED TERMS:
 *   - Single-source shortest path (SSSP).
 *   - Relaxation: if dist[u] + w < dist[v], update dist[v].
 *   - Lazy deletion: skip stale heap entries instead of decreasing keys.
 *   - Fails with negative weights (use Bellman-Ford instead).
 * RUN: node 12-graphs/07-dijkstra-shortest-path.js
 */

const { MinHeap } = require('../_shared/min-heap'); // priority queue

function dijkstra(n, edges, src) { // edges: [u, v, w] directed
  const adj = Array.from({ length: n }, () => []); edges.forEach(([u, v, w]) => adj[u].push([v, w])); // adjacency list
  const dist = new Array(n).fill(Infinity), prev = new Array(n).fill(-1); // best distances and parents
  dist[src] = 0; const pq = new MinHeap((a, b) => a[0] - b[0]); pq.push([0, src]); // heap of [distance, vertex]
  while (pq.size()) { // until all reachable vertices are settled
    const [d, u] = pq.pop(); // closest vertex
    if (d > dist[u]) continue; // stale entry (lazy deletion)
    for (const [v, w] of adj[u]) { // relax each edge
      if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; prev[v] = u; pq.push([dist[v], v]); } // found shorter path
    } // end for
  } // end while
  return { dist, prev }; // results
} // end dijkstra

function pathTo(prev, t) { const p = []; for (let v = t; v !== -1; v = prev[v]) p.push(v); return p.reverse(); } // rebuild path

function networkDelayTime(times, n, k) { // time for signal to reach all nodes (1-indexed)
  const { dist } = dijkstra(n + 1, times, k); // run from k
  const m = Math.max(...dist.slice(1)); // slowest node
  return m === Infinity ? -1 : m; // -1 if unreachable
} // end networkDelayTime

const edges = [[0, 1, 4], [0, 2, 1], [2, 1, 2], [1, 3, 1], [2, 3, 5], [3, 4, 3]]; // weighted directed graph
const { dist, prev } = dijkstra(5, edges, 0); // from vertex 0
console.log('distances from 0 =', dist); // [0,3,1,4,7]
console.log('path 0 → 4       =', pathTo(prev, 4).join(' → ')); // 0 → 2 → 1 → 3 → 4
console.log('networkDelayTime =', networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2)); // 2
