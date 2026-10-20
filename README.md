# DSA Mastery Kit — Runnable JavaScript Code

One file per DSA term, 16 categories, 91 lesson files. Every file starts with a **TERM** and a one-line **DEFINITION**, lists **RELATED TERMS**, and every code line has an explanation comment beside it.

## Quick start
1. Install **Node.js 18+** (https://nodejs.org) and **VS Code**.
2. In VS Code: **File → Open Folder…** → choose this `dsa-code` folder.
3. Open the terminal: **View → Terminal** (or Ctrl + `).
4. Run:
   - `node 05-sorting/04-merge-sort.js` — run one file
   - `npm start` — run all 91 files with headings
   - `npm run list` — table of contents (file → term)
   - `npm run check` — pass/fail check of every file
   - `npm run graphs` (or `dp`, `trees`, `sorting`, …) — run one category
5. Or open any file and press **F5** → "Run current DSA file".

No packages to install — only Node.js built-ins are used.

## Folders
| Folder | Covers |
|---|---|
| 01-fundamentals | Big-O, recursion, bit manipulation, GCD/LCM, sieve, modular exponentiation, combinatorics, matrix exponentiation |
| 02-arrays | Array ops, two pointers, sliding window, prefix sum, difference array, Kadane, Dutch flag, Boyer-Moore, matrix |
| 03-strings | Palindrome/anagram, KMP, Rabin-Karp, Z-algorithm, Manacher, suffix array + LCP |
| 04-searching | Linear, binary, lower/upper bound, rotated array, binary search on answer, ternary, jump, exponential, interpolation |
| 05-sorting | Bubble, selection, insertion, merge, quick, heap, counting, radix, bucket, shell, cyclic, Tim sort |
| 06-linked-lists | Singly, doubly, circular, reverse, Floyd's cycle, merge, palindrome list |
| 07-stacks-queues | Stack, queue, circular queue, deque, min stack, monotonic stack/queue, infix→postfix |
| 08-hashing | Chaining, open addressing (linear/quadratic/double), HashMap/HashSet patterns |
| 09-trees | Traversals (incl. Morris), properties & views, BST, AVL, Red-Black, LCA + binary lifting, construction & serialization |
| 10-heaps | Binary heap, priority queue, top-K, k-way merge, running median |
| 11-advanced-data-structures | Trie, segment tree (lazy), Fenwick tree, sparse table, DSU, LRU/LFU cache, skip list, Bloom filter |
| 12-graphs | Representation, BFS, DFS, cycle detection, topological sort, bipartite, Dijkstra, Bellman-Ford, Floyd-Warshall, MST (Prim/Kruskal), SCC (Kosaraju/Tarjan), bridges & articulation points, A*, 0-1 BFS, Euler path, max flow |
| 13-dynamic-programming | Memo vs tabulation, 0/1 & unbounded knapsack, LIS, LCS, edit distance, grid DP, linear DP, interval DP, bitmask DP (TSP), tree DP, digit DP, stock DP |
| 14-greedy | Activity selection, fractional knapsack, jump game, gas station, Huffman coding, interval problems |
| 15-backtracking | Subsets, permutations, combinations, N-Queens, Sudoku, word search, rat in a maze |
| 16-divide-and-conquer | Quickselect, closest pair, Karatsuba, Master Theorem |
| _shared | Helper classes (TreeNode builder, MinHeap) imported by some lessons — not lessons themselves |

See the PDFs next to this folder for the full run guide, glossary and interview Q&A.
