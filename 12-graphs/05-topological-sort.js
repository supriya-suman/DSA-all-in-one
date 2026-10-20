/**
 * TERM: Topological Sort
 * DEFINITION: A topological order of a DAG lists vertices so every edge u → v has u before v; found by Kahn's algorithm (BFS on in-degrees) or by DFS finish order.
 * RELATED TERMS:
 *   - Kahn's algorithm: repeatedly remove nodes with in-degree 0.
 *   - Course schedule, build systems, task dependencies are typical uses.
 *   - Only DAGs have a topological order.
 * RUN: node 12-graphs/05-topological-sort.js
 */

function kahnTopoSort(n, edges) { // BFS approach
  const adj = Array.from({ length: n }, () => []), indeg = new Array(n).fill(0); // graph and in-degrees
  for (const [u, v] of edges) { adj[u].push(v); indeg[v]++; } // build graph
  const q = []; for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i); // start with nodes having no prerequisites
  const order = []; // result
  while (q.length) { // process ready nodes
    const u = q.shift(); order.push(u); // take a ready node
    for (const v of adj[u]) if (--indeg[v] === 0) q.push(v); // removing u may free its neighbours
  } // end while
  return order.length === n ? order : null; // null means a cycle exists
} // end kahnTopoSort

function dfsTopoSort(n, edges) { // DFS approach: reverse post-order
  const adj = Array.from({ length: n }, () => []); edges.forEach(([u, v]) => adj[u].push(v)); // graph
  const visited = new Array(n).fill(false), stack = []; // visited and finish stack
  const dfs = (u) => { visited[u] = true; for (const v of adj[u]) if (!visited[v]) dfs(v); stack.push(u); }; // push after all descendants finish
  for (let i = 0; i < n; i++) if (!visited[i]) dfs(i); // cover all nodes
  return stack.reverse(); // reverse finish order
} // end dfsTopoSort

function canFinishCourses(numCourses, prerequisites) { // [course, prereq] pairs
  return kahnTopoSort(numCourses, prerequisites.map(([c, p]) => [p, c])) !== null; // possible iff no cycle
} // end canFinishCourses

function alienDictionaryOrder(words) { // derive letter order from sorted alien words
  const letters = [...new Set(words.join(''))], idx = new Map(letters.map((c, i) => [c, i])), edges = []; // nodes = letters
  for (let i = 0; i + 1 < words.length; i++) { const [a, b] = [words[i], words[i + 1]]; for (let j = 0; j < Math.min(a.length, b.length); j++) if (a[j] !== b[j]) { edges.push([idx.get(a[j]), idx.get(b[j])]); break; } } // first difference gives an edge
  const order = kahnTopoSort(letters.length, edges); // topological order
  return order ? order.map(i => letters[i]).join('') : ''; // letters in order
} // end alienDictionaryOrder

const edges = [[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]]; // classic DAG
console.log('Kahn topo order  =', kahnTopoSort(6, edges).join(' ')); // 4 5 2 0 3 1
console.log('DFS topo order   =', dfsTopoSort(6, edges).join(' ')); // 5 4 2 3 1 0
console.log('canFinish (ok)   =', canFinishCourses(2, [[1, 0]])); // true
console.log('canFinish (cycle)=', canFinishCourses(2, [[1, 0], [0, 1]])); // false
console.log('alien dictionary =', alienDictionaryOrder(['wrt', 'wrf', 'er', 'ett', 'rftt'])); // wertf
