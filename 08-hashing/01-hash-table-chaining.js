/**
 * TERM: Hash Table (Separate Chaining)
 * DEFINITION: A hash table maps keys to values by computing a hash index into an array of buckets, giving O(1) average insert/search/delete.
 * RELATED TERMS:
 *   - Hash function: converts a key into an array index.
 *   - Collision: two keys map to the same bucket.
 *   - Separate chaining: each bucket stores a list of entries.
 *   - Load factor (α): entries / buckets; when too high we rehash.
 *   - Rehashing: grow the bucket array and reinsert all keys.
 * RUN: node 08-hashing/01-hash-table-chaining.js
 */

class HashTable { // key → value map with chaining
  constructor(capacity = 4) { this.buckets = Array.from({ length: capacity }, () => []); this.count = 0; } // array of buckets

  #hash(key) { // polynomial string hash
    const s = String(key); let h = 0; // treat key as a string
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; // mix each char, keep unsigned 32-bit
    return h % this.buckets.length; // map into bucket range
  } // end hash

  set(key, value) { // insert or update
    const bucket = this.buckets[this.#hash(key)]; // find bucket
    const entry = bucket.find(e => e[0] === key); // existing key?
    if (entry) { entry[1] = value; return; } // update value
    bucket.push([key, value]); this.count++; // add new entry (collision just extends the chain)
    if (this.count / this.buckets.length > 0.75) this.#rehash(); // keep load factor ≤ 0.75
  } // end set

  get(key) { const e = this.buckets[this.#hash(key)].find(e => e[0] === key); return e ? e[1] : undefined; } // search the chain

  delete(key) { // remove a key
    const b = this.buckets[this.#hash(key)]; // bucket
    const i = b.findIndex(e => e[0] === key); // position in chain
    if (i >= 0) { b.splice(i, 1); this.count--; return true; } // removed
    return false; // key missing
  } // end delete

  #rehash() { // double capacity and reinsert
    const old = this.buckets.flat(); // all entries
    this.buckets = Array.from({ length: this.buckets.length * 2 }, () => []); this.count = 0; // new empty buckets
    for (const [k, v] of old) this.set(k, v); // reinsert with new indices
  } // end rehash

  loadFactor() { return (this.count / this.buckets.length).toFixed(2); } // α
} // end HashTable

const ht = new HashTable(); // start with 4 buckets
['apple', 'banana', 'cherry', 'date', 'elder'].forEach((f, i) => ht.set(f, i)); // insert 5 → triggers rehash
console.log('get(cherry)   =', ht.get('cherry')); // 2
ht.set('apple', 100); // update existing key
console.log('get(apple)    =', ht.get('apple')); // 100
console.log('delete(date)  =', ht.delete('date'), '| get(date) =', ht.get('date')); // true | undefined
console.log('buckets/load  =', ht.buckets.length, '/', ht.loadFactor()); // 8 / 0.50
