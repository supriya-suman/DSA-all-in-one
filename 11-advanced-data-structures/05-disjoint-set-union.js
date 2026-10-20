/**
 * TERM: Disjoint Set Union (DSU) / Union-Find
 * DEFINITION: DSU keeps elements in disjoint groups and supports find (which group?) and union (merge groups) in nearly O(1) amortized time.
 * RELATED TERMS:
 *   - Path compression: point nodes directly to the root during find.
 *   - Union by rank/size: attach the smaller tree under the larger.
 *   - Inverse Ackermann α(n): the near-constant amortized cost with both optimizations.
 *   - Used for Kruskal's MST, connected components, cycle detection in undirected graphs.
 * RUN: node 11-advanced-data-structures/05-disjoint-set-union.js
 */

class DSU { // union by size + path compression
  constructor(n) { this.parent = Array.from({ length: n }, (_, i) => i); this.size = new Array(n).fill(1); this.components = n; } // each node is its own set
  find(x) { // returns representative (root)
    while (this.parent[x] !== x) { this.parent[x] = this.parent[this.parent[x]]; x = this.parent[x]; } // path halving (a form of path compression)
    return x; // root
  } // end find
  union(a, b) { // merge sets; false if already joined
    let ra = this.find(a), rb = this.find(b); // roots
    if (ra === rb) return false; // same set → would form a cycle
    if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra]; // make ra the bigger tree
    this.parent[rb] = ra; this.size[ra] += this.size[rb]; this.components--; // attach smaller under bigger
    return true; // merged
  } // end union
  connected(a, b) { return this.find(a) === this.find(b); } // same group?
} // end DSU

function hasCycleUndirected(n, edges) { // cycle detection with DSU
  const d = new DSU(n); // fresh sets
  for (const [u, v] of edges) if (!d.union(u, v)) return true; // edge inside one set closes a cycle
  return false; // forest
} // end hasCycleUndirected

function accountsMergeDemo() { // group emails that share an owner
  const emails = ['a@x', 'b@x', 'c@x', 'd@x']; const links = [[0, 1], [1, 2]]; // a-b-c linked, d alone
  const d = new DSU(emails.length); links.forEach(([u, v]) => d.union(u, v)); // join linked emails
  const groups = new Map(); emails.forEach((e, i) => { const r = d.find(i); if (!groups.has(r)) groups.set(r, []); groups.get(r).push(e); }); // bucket by root
  return [...groups.values()]; // merged groups
} // end accountsMergeDemo

const dsu = new DSU(6); // elements 0..5
dsu.union(0, 1); dsu.union(1, 2); dsu.union(3, 4); // groups {0,1,2} {3,4} {5}
console.log('connected(0,2) =', dsu.connected(0, 2), '| connected(2,3) =', dsu.connected(2, 3)); // true | false
console.log('components     =', dsu.components); // 3
console.log('has cycle      =', hasCycleUndirected(4, [[0, 1], [1, 2], [2, 0]])); // true
console.log('merged groups  =', JSON.stringify(accountsMergeDemo())); // [["a@x","b@x","c@x"],["d@x"]]
