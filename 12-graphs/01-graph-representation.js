/**
 * TERM: Graph & Graph Representation
 * DEFINITION: A graph is a set of vertices (nodes) connected by edges; it is stored as an adjacency list, adjacency matrix or edge list.
 * RELATED TERMS:
 *   - Directed vs Undirected: edges have a direction or not.  Weighted vs Unweighted: edges carry a cost or not.
 *   - Degree: number of edges at a vertex (in-degree / out-degree for directed graphs).
 *   - Path, Cycle, Connected graph, Connected component, Tree (connected acyclic graph), Forest.
 *   - DAG: Directed Acyclic Graph.  Dense graph: E ≈ V².  Sparse graph: E ≈ V.
 *   - Self-loop: edge from a vertex to itself.  Multigraph: allows parallel edges.
 *   - Adjacency list: O(V + E) space.  Adjacency matrix: O(V²) space, O(1) edge check.
 * RUN: node 12-graphs/01-graph-representation.js
 */

const V = 4; // vertices 0..3
const edges = [[0, 1, 5], [0, 2, 3], [1, 2, 2], [2, 3, 7]]; // edge list: [from, to, weight]

const adjList = Array.from({ length: V }, () => []); // one list of neighbours per vertex
for (const [u, v, w] of edges) { adjList[u].push([v, w]); adjList[v].push([u, w]); } // undirected → add both directions

const adjMatrix = Array.from({ length: V }, () => new Array(V).fill(0)); // V x V grid of weights
for (const [u, v, w] of edges) { adjMatrix[u][v] = w; adjMatrix[v][u] = w; } // symmetric for undirected

const directed = Array.from({ length: V }, () => []); // directed adjacency list
for (const [u, v] of edges) directed[u].push(v); // only u → v
const inDegree = new Array(V).fill(0); // incoming edge counts
for (const [, v] of edges) inDegree[v]++; // count edges entering v
const outDegree = directed.map(list => list.length); // outgoing edge counts

console.log('edge list         =', JSON.stringify(edges)); // raw edges
console.log('adjacency list    =', JSON.stringify(adjList)); // neighbours with weights
console.log('adjacency matrix  ='); adjMatrix.forEach(r => console.log('   ', r.join(' '))); // print rows
console.log('degree (undirected)=', adjList.map(l => l.length)); // [2,2,3,1]
console.log('in / out degree   =', inDegree, outDegree); // directed degrees
console.log('edge 1-3 exists?  =', adjMatrix[1][3] !== 0); // O(1) check with matrix → false
console.log('dense vs sparse   = E =', edges.length, 'vs V² =', V * V); // 4 vs 16 → sparse
