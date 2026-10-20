/**
 * TERM: Skip List & Bloom Filter
 * DEFINITION: A skip list is a layered sorted linked list with express lanes giving O(log n) expected search; a Bloom filter is a bit array with k hash functions that answers "definitely not present" or "probably present".
 * RELATED TERMS:
 *   - Probabilistic data structure: trades exactness for speed/space.
 *   - False positive: Bloom filter says present when it is not (false negatives never happen).
 * RUN: node 11-advanced-data-structures/07-skip-list-and-bloom-filter.js
 */

class SkipNode { constructor(val, level) { this.val = val; this.next = new Array(level + 1).fill(null); } } // one forward pointer per level

class SkipList { // sorted set
  constructor(maxLevel = 8, p = 0.5) { this.maxLevel = maxLevel; this.p = p; this.level = 0; this.head = new SkipNode(-Infinity, maxLevel); } // head spans all levels
  #randomLevel() { let l = 0; while (Math.random() < this.p && l < this.maxLevel) l++; return l; } // coin flips decide height
  insert(val) { // O(log n) expected
    const update = new Array(this.maxLevel + 1).fill(this.head); let cur = this.head; // last node before val on each level
    for (let i = this.level; i >= 0; i--) { while (cur.next[i] && cur.next[i].val < val) cur = cur.next[i]; update[i] = cur; } // descend levels
    const lvl = this.#randomLevel(); if (lvl > this.level) this.level = lvl; // new top level
    const node = new SkipNode(val, lvl); // node with random height
    for (let i = 0; i <= lvl; i++) { node.next[i] = update[i].next[i]; update[i].next[i] = node; } // splice into each level
  } // end insert
  search(val) { // O(log n) expected
    let cur = this.head; // start at top-left
    for (let i = this.level; i >= 0; i--) while (cur.next[i] && cur.next[i].val < val) cur = cur.next[i]; // move right then down
    cur = cur.next[0]; return !!cur && cur.val === val; // check bottom level
  } // end search
  toArray() { const o = []; for (let c = this.head.next[0]; c; c = c.next[0]) o.push(c.val); return o; } // bottom level is fully sorted
} // end SkipList

class BloomFilter { // m bits, k hashes
  constructor(m = 64, k = 3) { this.m = m; this.k = k; this.bits = new Uint8Array(m); } // bit array
  #hashes(s) { // k positions using double hashing
    let h1 = 5381, h2 = 0; for (const c of s) { h1 = ((h1 << 5) + h1 + c.charCodeAt(0)) >>> 0; h2 = (h2 * 31 + c.charCodeAt(0)) >>> 0; } // two base hashes
    return Array.from({ length: this.k }, (_, i) => (h1 + i * h2) % this.m); // combine them
  } // end hashes
  add(s) { for (const i of this.#hashes(s)) this.bits[i] = 1; } // set k bits
  mightContain(s) { return this.#hashes(s).every(i => this.bits[i] === 1); } // all bits set → probably present
} // end BloomFilter

const sl = new SkipList(); [3, 6, 7, 9, 12, 19, 17, 26, 21, 25].forEach(v => sl.insert(v)); // insert values
console.log('skip list sorted  =', sl.toArray().join(' ')); // 3 6 7 9 12 17 19 21 25 26
console.log('search(19), (15)  =', sl.search(19), sl.search(15)); // true false
const bf = new BloomFilter(); ['apple', 'banana', 'mango'].forEach(w => bf.add(w)); // add words
console.log('bloom apple       =', bf.mightContain('apple')); // true (never a false negative)
console.log('bloom grape       =', bf.mightContain('grape'), '(false means definitely absent)'); // usually false
