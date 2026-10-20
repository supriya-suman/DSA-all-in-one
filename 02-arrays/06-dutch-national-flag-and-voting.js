/**
 * TERM: Dutch National Flag (3-way partition) & Boyer-Moore Majority Vote
 * DEFINITION: Dutch National Flag sorts an array of 0s, 1s and 2s in one pass using three pointers; Boyer-Moore finds the majority element (> n/2) in O(n) time and O(1) space.
 * RELATED TERMS:
 *   - Partitioning: rearranging elements around a pivot or categories.
 *   - Majority element: appears more than n/2 times.
 * RUN: node 02-arrays/06-dutch-national-flag-and-voting.js
 */

function sortColors(a) { // low/mid/high pointers
  let low = 0, mid = 0, high = a.length - 1; // [0..low-1]=0, [low..mid-1]=1, [high+1..]=2
  while (mid <= high) { // unknown region is mid..high
    if (a[mid] === 0) { [a[low], a[mid]] = [a[mid], a[low]]; low++; mid++; } // move 0 to the front
    else if (a[mid] === 1) mid++; // 1 is already in the middle
    else { [a[mid], a[high]] = [a[high], a[mid]]; high--; } // move 2 to the back (don't advance mid)
  } // end while
  return a; // sorted colors
} // end sortColors

function majorityElement(nums) { // Boyer-Moore voting
  let candidate = null, count = 0; // current candidate and its vote balance
  for (const x of nums) { // each element votes
    if (count === 0) candidate = x; // pick new candidate when balance is zero
    count += x === candidate ? 1 : -1; // same value votes for, others against
  } // end for
  const freq = nums.filter(x => x === candidate).length; // verification pass
  return freq > nums.length / 2 ? candidate : null; // confirm majority
} // end majorityElement

function moveZeroesToEnd(a) { // stable partition of non-zeros to front
  let write = 0; // next position for a non-zero
  for (const x of a) if (x !== 0) a[write++] = x; // copy non-zeros forward
  while (write < a.length) a[write++] = 0; // fill the rest with zeros
  return a; // result
} // end moveZeroesToEnd

console.log('sortColors      =', sortColors([2, 0, 2, 1, 1, 0])); // [0,0,1,1,2,2]
console.log('majorityElement =', majorityElement([2, 2, 1, 1, 1, 2, 2])); // 2
console.log('moveZeroesToEnd =', moveZeroesToEnd([0, 1, 0, 3, 12])); // [1,3,12,0,0]
