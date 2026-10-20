/**
 * TERM: Open Addressing (Linear Probing, Quadratic Probing, Double Hashing)
 * DEFINITION: Open addressing resolves collisions by storing every key inside the array itself and probing for the next free slot.
 * RELATED TERMS:
 *   - Linear probing: try i, i+1, i+2, … (suffers from primary clustering).
 *   - Quadratic probing: try i, i+1², i+2², … (reduces clustering).
 *   - Double hashing: step size comes from a second hash function.
 *   - Tombstone: marker left on deletion so probing chains are not broken.
 * RUN: node 08-hashing/02-open-addressing.js
 */

const TOMBSTONE = Symbol('deleted'); // marks a deleted slot

class LinearProbingMap { // integer keys for simplicity
  constructor(cap = 11) { this.keys = new Array(cap).fill(null); this.vals = new Array(cap); this.cap = cap; } // parallel arrays
  #h(k) { return ((k % this.cap) + this.cap) % this.cap; } // primary hash
  set(k, v) { // insert or update
    let i = this.#h(k), firstTomb = -1; // start slot and first reusable tombstone
    for (let step = 0; step < this.cap; step++, i = (i + 1) % this.cap) { // linear probe
      if (this.keys[i] === TOMBSTONE) { if (firstTomb < 0) firstTomb = i; continue; } // remember tombstone, keep searching for key
      if (this.keys[i] === null) { const t = firstTomb >= 0 ? firstTomb : i; this.keys[t] = k; this.vals[t] = v; return; } // empty → insert
      if (this.keys[i] === k) { this.vals[i] = v; return; } // update existing
    } // end for
    if (firstTomb >= 0) { this.keys[firstTomb] = k; this.vals[firstTomb] = v; return; } // reuse tombstone
    throw new Error('table full'); // no space
  } // end set
  get(k) { // probe until key or empty slot
    for (let i = this.#h(k), s = 0; s < this.cap && this.keys[i] !== null; s++, i = (i + 1) % this.cap) if (this.keys[i] === k) return this.vals[i]; // found
    return undefined; // hit an empty slot → absent
  } // end get
  delete(k) { // leave a tombstone
    for (let i = this.#h(k), s = 0; s < this.cap && this.keys[i] !== null; s++, i = (i + 1) % this.cap) if (this.keys[i] === k) { this.keys[i] = TOMBSTONE; return true; } // mark deleted
    return false; // absent
  } // end delete
} // end LinearProbingMap

function probeSequence(key, cap, kind) { // show first 5 probe slots for each strategy
  const h1 = key % cap, h2 = 7 - (key % 7); // primary and secondary hashes
  return [0, 1, 2, 3, 4].map(i => kind === 'linear' ? (h1 + i) % cap : kind === 'quadratic' ? (h1 + i * i) % cap : (h1 + i * h2) % cap); // formulas
} // end probeSequence

const m = new LinearProbingMap(); // capacity 11
m.set(5, 'five'); m.set(16, 'sixteen'); m.set(27, 'twenty-seven'); // all hash to slot 5 → probe 5,6,7
console.log('slots used      =', m.keys.map((k, i) => (k === null ? '.' : `${i}:${String(k)}`)).filter(x => x !== '.').join(' ')); // 5:5 6:16 7:27
m.delete(16); // tombstone at slot 6
console.log('get(27) after delete(16) =', m.get(27)); // still found thanks to tombstone
console.log('linear probes   =', probeSequence(5, 11, 'linear')); // [5,6,7,8,9]
console.log('quadratic probes=', probeSequence(5, 11, 'quadratic')); // [5,6,9,3,10]
console.log('double hashing  =', probeSequence(5, 11, 'double')); // [5,7,9,0,2]
