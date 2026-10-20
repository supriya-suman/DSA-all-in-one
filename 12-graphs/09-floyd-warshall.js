/**
 * TERM: Floyd-Warshall Algorithm
 * DEFINITION: Floyd-Warshall computes shortest paths between all pairs of vertices by trying every vertex k as an intermediate stop; O(V³), handles negative edges (not negative cycles).
 * RELATED TERMS:
 *   - All-pairs shortest path (APSP).
 *   - Transitive closure: which vertices can reach which (Warshall's algorithm).
 *   - Negative cycle check: dist[i][i] < 0 after running.
 * RUN: node 12-graphs/09-floyd-warshall.js
 */

function floydWarshall(n, edges) { // returns distance matrix
  const d = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 0 : Infinity))); // 0 on diagonal, ∞ elsewhere
  for (const [u, v, w] of edges) d[u][v] = Math.min(d[u][v], w); // direct edges
  for (let k = 0; k < n; k++) // allow vertex k as an intermediate
    for (let i = 0; i < n; i++) // every source
      for (let j = 0; j < n; j++) // every destination
        if (d[i][k] + d[k][j] < d[i][j]) d[i][j] = d[i][k] + d[k][j]; // going through k is shorter
  const negativeCycle = d.some((row, i) => row[i] < 0); // negative self-distance means a negative cycle
  return { d, negativeCycle }; // matrix and flag
} // end floydWarshall

function transitiveClosure(n, edges) { // reachability matrix
  const r = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j)); // every node reaches itself
  edges.forEach(([u, v]) => (r[u][v] = true)); // direct reachability
  for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) r[i][j] = r[i][j] || (r[i][k] && r[k][j]); // reach j through k
  return r.map(row => row.map(Number)); // as 0/1
} // end transitiveClosure

const { d, negativeCycle } = floydWarshall(4, [[0, 1, 5], [0, 3, 10], [1, 2, 3], [2, 3, 1]]); // sample graph
console.log('all-pairs distances:'); d.forEach(row => console.log('   ', row.map(x => (x === Infinity ? '∞' : x)).join('\t'))); // print matrix
console.log('negative cycle     =', negativeCycle); // false
console.log('transitive closure =', JSON.stringify(transitiveClosure(3, [[0, 1], [1, 2]]))); // [[1,1,1],[0,1,1],[0,0,1]]
