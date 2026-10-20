/**
 * TERM: Minimum Spanning Tree (Prim's & Kruskal's Algorithms)
 * DEFINITION: An MST connects all vertices of a weighted undirected graph with V-1 edges of minimum total weight; Kruskal adds cheapest edges that don't form a cycle, Prim grows the tree from a start vertex.
 * RELATED TERMS:
 *   - Spanning tree: subgraph that is a tree and includes every vertex.
 *   - Cut property: the lightest edge crossing any cut belongs to some MST.
 *   - Kruskal: O(E log E) with DSU.  Prim: O(E log V) with a heap.
 * RUN: node 12-graphs/10-minimum-spanning-tree.js
 */

const { MinHeap } = require('../_shared/min-heap'); // priority queue for Prim

function kruskal(n, edges) { // edges: [u, v, w]
  const parent = Array.from({ length: n }, (_, i) => i); // DSU parent array
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x]))); // find with path compression
  const mst = []; let total = 0; // chosen edges and weight
  for (const [u, v, w] of [...edges].sort((a, b) => a[2] - b[2])) { // cheapest edges first
    const ru = find(u), rv = find(v); // components of endpoints
    if (ru !== rv) { parent[ru] = rv; mst.push([u, v, w]); total += w; } // different components → edge is safe
    if (mst.length === n - 1) break; // tree complete
  } // end for
  return { total, mst }; // result
} // end kruskal

function prim(n, edges, start = 0) { // lazy Prim with a heap
  const adj = Array.from({ length: n }, () => []); edges.forEach(([u, v, w]) => { adj[u].push([v, w]); adj[v].push([u, w]); }); // undirected graph
  const inTree = new Array(n).fill(false), pq = new MinHeap((a, b) => a[0] - b[0]); // visited and heap of [w, v, from]
  pq.push([0, start, -1]); let total = 0; const mst = []; // start vertex costs 0
  while (pq.size()) { // grow tree
    const [w, v, from] = pq.pop(); if (inTree[v]) continue; // skip vertices already in the tree
    inTree[v] = true; total += w; if (from !== -1) mst.push([from, v, w]); // add vertex and edge
    for (const [nv, nw] of adj[v]) if (!inTree[nv]) pq.push([nw, nv, v]); // candidate edges leaving the tree
  } // end while
  return { total, mst }; // result
} // end prim

const edges = [[0, 1, 4], [0, 7, 8], [1, 2, 8], [1, 7, 11], [2, 3, 7], [2, 8, 2], [2, 5, 4], [3, 4, 9], [3, 5, 14], [4, 5, 10], [5, 6, 2], [6, 7, 1], [6, 8, 6], [7, 8, 7]]; // classic 9-vertex graph
console.log('Kruskal total =', kruskal(9, edges).total); // 37
console.log('Prim total    =', prim(9, edges).total); // 37
console.log('Kruskal edges =', JSON.stringify(kruskal(9, edges).mst)); // 8 edges
