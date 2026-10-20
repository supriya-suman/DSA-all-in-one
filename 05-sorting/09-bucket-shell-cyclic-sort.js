/**
 * TERM: Bucket Sort, Shell Sort & Cyclic Sort
 * DEFINITION: Bucket sort spreads values into buckets and sorts each; Shell sort is insertion sort over shrinking gaps; Cyclic sort places numbers 1..n directly at index value-1.
 * RELATED TERMS:
 *   - Gap sequence: the decreasing gaps used by Shell sort (n/2, n/4, …, 1).
 *   - Missing/duplicate number problems are solved with cyclic sort in O(n).
 *   - Tim sort: hybrid of merge + insertion sort used by Python, Java and V8 (JS Array.sort).
 * RUN: node 05-sorting/09-bucket-shell-cyclic-sort.js
 */

function bucketSort(arr, bucketCount = 5) { // best for uniformly distributed floats
  const min = Math.min(...arr), max = Math.max(...arr); // value range
  const buckets = Array.from({ length: bucketCount }, () => []); // empty buckets
  for (const x of arr) { // distribute values
    const idx = Math.min(bucketCount - 1, Math.floor(((x - min) / (max - min || 1)) * bucketCount)); // pick bucket by value
    buckets[idx].push(x); // drop into bucket
  } // end for
  return buckets.flatMap(b => b.sort((a, c) => a - c)); // sort each bucket and concatenate
} // end bucketSort

function shellSort(arr) { // gapped insertion sort
  const a = [...arr]; // copy
  for (let gap = a.length >> 1; gap > 0; gap >>= 1) { // shrink gap by half
    for (let i = gap; i < a.length; i++) { // insertion sort with stride = gap
      const tmp = a[i]; let j = i; // element to place
      while (j >= gap && a[j - gap] > tmp) { a[j] = a[j - gap]; j -= gap; } // shift gap-apart elements
      a[j] = tmp; // place element
    } // end inner for
  } // end gap loop
  return a; // sorted
} // end shellSort

function cyclicSort(arr) { // numbers are exactly 1..n in any order
  const a = [...arr]; let i = 0; // copy and index
  while (i < a.length) { // until every slot is correct
    const correct = a[i] - 1; // where a[i] belongs
    if (a[i] !== a[correct]) [a[i], a[correct]] = [a[correct], a[i]]; // swap into place
    else i++; // already correct → move on
  } // end while
  return a; // sorted
} // end cyclicSort

function findMissingNumber(nums) { // 0..n with one missing, using cyclic placement
  const a = [...nums]; let i = 0; // copy
  while (i < a.length) { const c = a[i]; if (c < a.length && a[i] !== a[c]) [a[i], a[c]] = [a[c], a[i]]; else i++; } // place value v at index v
  for (let k = 0; k < a.length; k++) if (a[k] !== k) return k; // first wrong slot is missing value
  return a.length; // n is missing
} // end findMissingNumber

console.log('bucketSort        =', bucketSort([0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51])); // ascending floats
console.log('shellSort         =', shellSort([23, 29, 15, 19, 31, 7, 9, 5, 2])); // ascending
console.log('cyclicSort        =', cyclicSort([3, 1, 5, 4, 2])); // [1,2,3,4,5]
console.log('findMissingNumber =', findMissingNumber([3, 0, 1])); // 2
console.log('Tim sort (built-in)=', [5, 3, 9, 1].sort((a, b) => a - b)); // V8 uses TimSort
