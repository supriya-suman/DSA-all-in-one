/**
 * TERM: LRU Cache & LFU Cache
 * DEFINITION: An LRU (Least Recently Used) cache evicts the item unused for the longest time; an LFU (Least Frequently Used) cache evicts the item used the fewest times — both in O(1) per operation.
 * RELATED TERMS:
 *   - HashMap + Doubly linked list: classic O(1) LRU design.
 *   - JS Map keeps insertion order, so delete + set moves a key to the "most recent" end.
 *   - Eviction policy: rule that decides which item to remove when the cache is full.
 * RUN: node 11-advanced-data-structures/06-lru-and-lfu-cache.js
 */

class LRUNode { constructor(k, v) { this.key = k; this.val = v; this.prev = this.next = null; } } // doubly linked node

class LRUCache { // HashMap + Doubly Linked List
  constructor(capacity) { // sentinels avoid null checks
    this.cap = capacity; this.map = new Map(); // key → node
    this.head = new LRUNode(); this.tail = new LRUNode(); // head = most recent side, tail = least recent side
    this.head.next = this.tail; this.tail.prev = this.head; // empty list
  } // end constructor
  #remove(n) { n.prev.next = n.next; n.next.prev = n.prev; } // unlink node O(1)
  #addFront(n) { n.next = this.head.next; n.prev = this.head; this.head.next.prev = n; this.head.next = n; } // insert after head O(1)
  get(key) { // O(1)
    const n = this.map.get(key); if (!n) return -1; // miss
    this.#remove(n); this.#addFront(n); // mark as most recently used
    return n.val; // hit
  } // end get
  put(key, val) { // O(1)
    if (this.map.has(key)) this.#remove(this.map.get(key)); // replace existing
    const n = new LRUNode(key, val); this.#addFront(n); this.map.set(key, n); // insert as most recent
    if (this.map.size > this.cap) { const lru = this.tail.prev; this.#remove(lru); this.map.delete(lru.key); } // evict least recent
  } // end put
} // end LRUCache

class LFUCache { // freq → Map(key) keeps keys of equal frequency in LRU order
  constructor(cap) { this.cap = cap; this.vals = new Map(); this.freq = new Map(); this.buckets = new Map(); this.minFreq = 0; } // values, key frequency, frequency buckets
  #touch(key) { // increase frequency of key
    const f = this.freq.get(key); this.freq.set(key, f + 1); // bump count
    this.buckets.get(f).delete(key); // leave old bucket
    if (f === this.minFreq && this.buckets.get(f).size === 0) this.minFreq++; // old min bucket emptied
    if (!this.buckets.has(f + 1)) this.buckets.set(f + 1, new Map()); this.buckets.get(f + 1).set(key, true); // join new bucket
  } // end touch
  get(key) { if (!this.vals.has(key)) return -1; this.#touch(key); return this.vals.get(key); } // read and bump
  put(key, val) { // insert or update
    if (this.cap === 0) return; // nothing can be stored
    if (this.vals.has(key)) { this.vals.set(key, val); this.#touch(key); return; } // update existing
    if (this.vals.size >= this.cap) { const victim = this.buckets.get(this.minFreq).keys().next().value; this.buckets.get(this.minFreq).delete(victim); this.vals.delete(victim); this.freq.delete(victim); } // evict least frequent (oldest among ties)
    this.vals.set(key, val); this.freq.set(key, 1); this.minFreq = 1; // new key starts at frequency 1
    if (!this.buckets.has(1)) this.buckets.set(1, new Map()); this.buckets.get(1).set(key, true); // add to bucket 1
  } // end put
} // end LFUCache

const lru = new LRUCache(2); // capacity 2
lru.put(1, 'one'); lru.put(2, 'two'); lru.get(1); lru.put(3, 'three'); // key 2 was least recent → evicted
console.log('LRU get(2) =', lru.get(2), '| get(1) =', lru.get(1), '| get(3) =', lru.get(3)); // -1 | one | three
const lfu = new LFUCache(2); // capacity 2
lfu.put(1, 1); lfu.put(2, 2); lfu.get(1); lfu.put(3, 3); // key 2 used least → evicted
console.log('LFU get(2) =', lfu.get(2), '| get(3) =', lfu.get(3)); // -1 | 3
