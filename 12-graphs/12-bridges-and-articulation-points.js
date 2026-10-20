/**
 * TERM: Bridges & Articulation Points (Cut Edges & Cut Vertices)
 * DEFINITION: A bridge is an edge whose removal disconnects the graph; an articulation point is a vertex whose removal disconnects it; both are found in O(V + E) with DFS discovery and low times.
 * RELATED TERMS:
 *   - Bridge condition: low[v] > disc[u] for tree edge u–v.
 *   - Articulation condition: low[v] >= disc[u] (non-root), or root with ≥ 2 DFS children.
 *   - Critical connections in a network.
 * RUN: node 12-graphs/12-bridges-and-articulation-points.js
 */

function bridgesAndCutVertices(n, edges) { // undirected graph
  const adj = Array.from({ length: n }, () => []); edges.forEach(([u, v]) => { adj[u].push(v); adj[v].push(u); }); // build graph
  const disc = new Array(n).fill(-1), low = new Array(n).fill(0), bridges = [], cut = new Set(); let time = 0; // bookkeeping
  const dfs = (u, parent) => { // DFS from u
    disc[u] = low[u] = time++; let children = 0; // set times
    for (const v of adj[u]) { // each neighbour
      if (v === parent) continue; // don't go straight back along the tree edge
      if (disc[v] === -1) { // tree edge
        children++; dfs(v, u); low[u] = Math.min(low[u], low[v]); // child finished, inherit its low
        if (low[v] > disc[u]) bridges.push([u, v]); // v can't reach u or above without this edge → bridge
        if (parent !== -1 && low[v] >= disc[u]) cut.add(u); // v's subtree can't bypass u → articulation point
      } else low[u] = Math.min(low[u], disc[v]); // back edge
    } // end for
    if (parent === -1 && children > 1) cut.add(u); // root is a cut vertex if it has 2+ DFS children
  }; // end dfs
  for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i, -1); // all components
  return { bridges, articulationPoints: [...cut].sort((a, b) => a - b) }; // results
} // end bridgesAndCutVertices

const res = bridgesAndCutVertices(5, [[1, 0], [0, 2], [2, 1], [0, 3], [3, 4]]); // triangle with a tail
console.log('bridges             =', JSON.stringify(res.bridges)); // [[3,4],[0,3]]
console.log('articulation points =', res.articulationPoints); // [0,3]
