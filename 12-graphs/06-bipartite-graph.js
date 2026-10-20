/**
 * TERM: Bipartite Graph (Graph Colouring with 2 colours)
 * DEFINITION: A graph is bipartite if its vertices can be split into two groups with every edge going between the groups; equivalently it has no odd-length cycle.
 * RELATED TERMS:
 *   - 2-colouring: colour neighbours with opposite colours using BFS/DFS.
 *   - Graph colouring / chromatic number: fewest colours so no edge joins same colours.
 * RUN: node 12-graphs/06-bipartite-graph.js
 */

function isBipartite(adj) { // BFS 2-colouring
  const color = new Array(adj.length).fill(-1); // -1 = uncoloured
  for (let s = 0; s < adj.length; s++) { // handle disconnected graphs
    if (color[s] !== -1) continue; // already coloured
    color[s] = 0; const q = [s]; // start BFS with colour 0
    while (q.length) { // BFS
      const u = q.shift(); // next node
      for (const v of adj[u]) { // check neighbours
        if (color[v] === -1) { color[v] = 1 - color[u]; q.push(v); } // give opposite colour
        else if (color[v] === color[u]) return { ok: false }; // same colour on both ends → not bipartite
      } // end for
    } // end while
  } // end for
  return { ok: true, color }; // valid 2-colouring
} // end isBipartite

function greedyColoring(adj) { // colours with at most (max degree + 1) colours
  const res = new Array(adj.length).fill(-1); // colour per vertex
  for (let u = 0; u < adj.length; u++) { const used = new Set(adj[u].map(v => res[v])); let c = 0; while (used.has(c)) c++; res[u] = c; } // smallest colour not used by neighbours
  return res; // colouring
} // end greedyColoring

console.log('square (even cycle)  =', JSON.stringify(isBipartite([[1, 3], [0, 2], [1, 3], [0, 2]]))); // ok true
console.log('triangle (odd cycle) =', JSON.stringify(isBipartite([[1, 2], [0, 2], [0, 1]]))); // ok false
console.log('greedy colouring     =', greedyColoring([[1, 2], [0, 2, 3], [0, 1, 3], [1, 2]])); // [0,1,2,0]
