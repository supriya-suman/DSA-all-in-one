/**
 * TERM: HashMap & HashSet Problem Patterns
 * DEFINITION: HashMap stores key→value pairs and HashSet stores unique keys, both with O(1) average lookup; they turn many O(n^2) searches into O(n).
 * RELATED TERMS:
 *   - Frequency map, complement lookup (Two Sum), seen-set de-duplication.
 *   - JS Map vs Object: Map keeps insertion order and allows any key type.
 * RUN: node 08-hashing/03-hashmap-hashset-problems.js
 */

function twoSum(nums, target) { // indices of two numbers adding to target
  const seen = new Map(); // value → index
  for (let i = 0; i < nums.length; i++) { // single pass
    const need = target - nums[i]; // complement we are looking for
    if (seen.has(need)) return [seen.get(need), i]; // found earlier complement
    seen.set(nums[i], i); // remember current value
  } // end for
  return null; // no pair
} // end twoSum

function longestConsecutive(nums) { // longest run of consecutive integers, O(n)
  const set = new Set(nums); let best = 0; // all values for O(1) lookup
  for (const x of set) { // try each number
    if (set.has(x - 1)) continue; // not the start of a run
    let len = 1; while (set.has(x + len)) len++; // extend run forward
    best = Math.max(best, len); // update answer
  } // end for
  return best; // length
} // end longestConsecutive

function topKFrequentWords(words, k) { // frequency map then sort
  const freq = new Map(); // word → count
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1); // count words
  return [...freq.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, k).map(e => e[0]); // highest counts first
} // end topKFrequentWords

function firstNonRepeatingChar(s) { // first char that appears once
  const cnt = new Map(); // char → count
  for (const c of s) cnt.set(c, (cnt.get(c) || 0) + 1); // count chars
  for (const c of s) if (cnt.get(c) === 1) return c; // first unique in original order
  return null; // none
} // end firstNonRepeatingChar

function containsDuplicate(nums) { return new Set(nums).size !== nums.length; } // set drops duplicates

console.log('twoSum                =', twoSum([2, 7, 11, 15], 9)); // [0,1]
console.log('longestConsecutive    =', longestConsecutive([100, 4, 200, 1, 3, 2])); // 4
console.log('topKFrequentWords     =', topKFrequentWords(['a', 'b', 'a', 'c', 'b', 'a'], 2)); // [a,b]
console.log('firstNonRepeatingChar =', firstNonRepeatingChar('swiss')); // w
console.log('containsDuplicate     =', containsDuplicate([1, 2, 3, 1])); // true
