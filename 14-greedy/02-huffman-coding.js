/**
 * TERM: Huffman Coding
 * DEFINITION: Huffman coding builds an optimal prefix-free binary code by repeatedly merging the two least frequent symbols, so frequent characters get shorter codes.
 * RELATED TERMS:
 *   - Prefix-free code: no code is a prefix of another, so decoding is unambiguous.
 *   - Optimal merge pattern / connect ropes with minimum cost: same greedy idea.
 * RUN: node 14-greedy/02-huffman-coding.js
 */

const { MinHeap } = require('../_shared/min-heap'); // priority queue

function huffman(text) { // returns code table and encoded string
  const freq = new Map(); for (const c of text) freq.set(c, (freq.get(c) || 0) + 1); // character frequencies
  const pq = new MinHeap((a, b) => a.f - b.f); for (const [c, f] of freq) pq.push({ c, f }); // leaf nodes
  while (pq.size() > 1) { const a = pq.pop(), b = pq.pop(); pq.push({ f: a.f + b.f, left: a, right: b }); } // merge two smallest
  const codes = {}; const walk = (n, code) => { if (n.c !== undefined) { codes[n.c] = code || '0'; return; } walk(n.left, code + '0'); walk(n.right, code + '1'); }; // left = 0, right = 1
  walk(pq.pop(), ''); // assign codes from root
  const encoded = [...text].map(c => codes[c]).join(''); // compress text
  return { codes, encoded, bitsBefore: text.length * 8, bitsAfter: encoded.length }; // compare sizes
} // end huffman

function connectRopes(ropes) { // min cost to connect ropes (cost = sum of lengths joined)
  const pq = new MinHeap(); ropes.forEach(r => pq.push(r)); let cost = 0; // heap of lengths
  while (pq.size() > 1) { const s = pq.pop() + pq.pop(); cost += s; pq.push(s); } // always join two shortest
  return cost; // total cost
} // end connectRopes

const h = huffman('abracadabra'); // encode sample text
console.log('codes      =', h.codes); // 'a' gets the shortest code
console.log('bits       =', h.bitsBefore, '→', h.bitsAfter); // 88 → 23
console.log('connectRopes([4,3,2,6]) =', connectRopes([4, 3, 2, 6])); // 29
