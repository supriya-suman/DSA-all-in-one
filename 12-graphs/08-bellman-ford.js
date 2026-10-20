/**
 * TERM: Bellman-Ford Algorithm
 * DEFINITION: Bellman-Ford finds single-source shortest paths even with negative edge weights by relaxing every edge V-1 times, and detects negative cycles; O(V * E).
 * RELATED TERMS:
 *   - Negative cycle: a cycle whose total weight is negative (shortest path becomes undefined).
 *   - SPFA: queue-based optimisation of Bellman-Ford.
 *   - K-stops variant: limit relaxation rounds to K+1 (cheapest flights within K stops).
 * RUN: node 12-graphs/08-bellman-ford.js
 */

function bellmanFord(n, edges, src) { // edges: [u, v, w]
  const dist = new Array(n).fill(Infinity); dist[src] = 0; // initial distances
  for (let i = 0; i < n - 1; i++) { // a shortest path has at most V-1 edges
    let changed = false; // early exit if nothing changes
    for (const [u, v, w] of edges) if (dist[u] !== Infinity && dist[u] + w < dist[v]) { dist[v] = dist[u] + w; changed = true; } // relax edge
    if (!changed) break; // converged early
  } // end for
  for (const [u, v, w] of edges) if (dist[u] !== Infinity && dist[u] + w < dist[v]) return { negativeCycle: true }; // still improvable → negative cycle
  return { negativeCycle: false, dist }; // valid result
} // end bellmanFord

function cheapestFlightWithinK(n, flights, src, dst, k) { // at most k stops
  let dist = new Array(n).fill(Infinity); dist[src] = 0; // cost with 0 edges
  for (let i = 0; i <= k; i++) { // k stops = k+1 edges
    const next = [...dist]; // use previous round only (prevents chaining within a round)
    for (const [u, v, w] of flights) if (dist[u] + w < next[v]) next[v] = dist[u] + w; // relax with old distances
    dist = next; // finish round
  } // end for
  return dist[dst] === Infinity ? -1 : dist[dst]; // answer
} // end cheapestFlightWithinK

console.log('with negative edge =', JSON.stringify(bellmanFord(5, [[0, 1, 6], [0, 2, 7], [1, 2, 8], [1, 3, 5], [1, 4, -4], [2, 3, -3], [2, 4, 9], [3, 1, -2], [4, 3, 7]], 0))); // dist [0,2,7,4,-2]
console.log('negative cycle     =', JSON.stringify(bellmanFord(3, [[0, 1, 1], [1, 2, -1], [2, 1, -1]], 0))); // negativeCycle true
console.log('cheapest ≤1 stop   =', cheapestFlightWithinK(4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1)); // 700
