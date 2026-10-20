/**
 * TERM: Trie (Prefix Tree)
 * DEFINITION: A trie is a tree where each edge is a character and each path from the root spells a prefix, giving O(L) insert/search for a word of length L.
 * RELATED TERMS:
 *   - End-of-word flag: marks that a complete word ends at a node.
 *   - Prefix search / autocomplete: walk the prefix then collect all words below.
 *   - Binary (XOR) trie: stores numbers bit by bit to find maximum XOR pairs.
 * RUN: node 11-advanced-data-structures/01-trie.js
 */

class TrieNode { constructor() { this.children = new Map(); this.isEnd = false; this.count = 0; } } // child map, word flag, words passing through

class Trie { // character trie
  constructor() { this.root = new TrieNode(); } // empty root
  insert(word) { // O(L)
    let node = this.root; // start at root
    for (const c of word) { if (!node.children.has(c)) node.children.set(c, new TrieNode()); node = node.children.get(c); node.count++; } // create path as needed
    node.isEnd = true; // mark complete word
  } // end insert
  #walk(s) { let node = this.root; for (const c of s) { node = node.children.get(c); if (!node) return null; } return node; } // follow characters
  search(word) { const n = this.#walk(word); return !!n && n.isEnd; } // full word exists
  startsWith(prefix) { return !!this.#walk(prefix); } // any word with this prefix
  countPrefix(prefix) { const n = this.#walk(prefix); return n ? n.count : 0; } // number of words with prefix
  autocomplete(prefix) { // all words starting with prefix
    const start = this.#walk(prefix), out = []; if (!start) return out; // no matches
    const dfs = (n, path) => { if (n.isEnd) out.push(path); for (const [c, ch] of n.children) dfs(ch, path + c); }; // collect words below
    dfs(start, prefix); return out; // suggestions
  } // end autocomplete
} // end Trie

function maxXorPair(nums) { // binary trie: best XOR of any two numbers, O(n * 32)
  const root = {}; // object-based trie of bits
  const insert = (x) => { let n = root; for (let b = 31; b >= 0; b--) { const bit = (x >> b) & 1; n = n[bit] ??= {}; } }; // insert bits MSB first
  const best = (x) => { let n = root, r = 0; for (let b = 31; b >= 0; b--) { const bit = (x >> b) & 1; if (n[1 - bit]) { r |= 1 << b; n = n[1 - bit]; } else n = n[bit]; } return r; }; // prefer opposite bit
  nums.forEach(insert); // build trie
  return Math.max(...nums.map(best)); // best over all numbers
} // end maxXorPair

const trie = new Trie(); ['apple', 'app', 'apply', 'apt', 'bat'].forEach(w => trie.insert(w)); // build trie
console.log('search(app)      =', trie.search('app'), '| search(ap) =', trie.search('ap')); // true | false
console.log('startsWith(ap)   =', trie.startsWith('ap')); // true
console.log('countPrefix(app) =', trie.countPrefix('app')); // 3
console.log('autocomplete(app)=', trie.autocomplete('app')); // [app, apple, apply]
console.log('maxXorPair       =', maxXorPair([3, 10, 5, 25, 2, 8])); // 28
