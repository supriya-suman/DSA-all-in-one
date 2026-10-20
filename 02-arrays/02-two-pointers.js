/**
 * TERM: Two Pointers
 * DEFINITION: A technique that moves two indices through a sequence (towards each other or in the same direction) to avoid nested loops.
 * RELATED TERMS:
 *   - Opposite-direction pointers: start at both ends (pair sum in sorted array).
 *   - Same-direction (fast/slow) pointers: one pointer runs ahead (remove duplicates).
 * RUN: node 02-arrays/02-two-pointers.js
 */

function pairWithSum(sorted, target) { // find two numbers adding to target in a sorted array, O(n)
  let left = 0, right = sorted.length - 1; // pointers at both ends
  while (left < right) { // until pointers meet
    const sum = sorted[left] + sorted[right]; // current pair sum
    if (sum === target) return [left, right]; // found the pair
    if (sum < target) left++; // need bigger sum → move left forward
    else right--; // need smaller sum → move right backward
  } // end while
  return null; // no such pair
} // end pairWithSum

function removeDuplicates(sorted) { // fast/slow pointers, in-place, O(n)
  if (!sorted.length) return 0; // empty array
  let slow = 0; // last position of unique values
  for (let fast = 1; fast < sorted.length; fast++) { // scan the array
    if (sorted[fast] !== sorted[slow]) sorted[++slow] = sorted[fast]; // new unique value goes next
  } // end for
  return slow + 1; // count of unique values
} // end removeDuplicates

function threeSum(nums) { // all unique triplets that sum to 0, O(n^2)
  nums = [...nums].sort((a, b) => a - b); // sort first so two-pointer works
  const res = []; // answers
  for (let i = 0; i < nums.length - 2; i++) { // fix the first element
    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicate first values
    let l = i + 1, r = nums.length - 1; // two pointers on the rest
    while (l < r) { // standard pair search
      const s = nums[i] + nums[l] + nums[r]; // triplet sum
      if (s === 0) { res.push([nums[i], nums[l], nums[r]]); while (nums[l] === nums[l + 1]) l++; while (nums[r] === nums[r - 1]) r--; l++; r--; } // record and skip duplicates
      else if (s < 0) l++; // too small
      else r--; // too large
    } // end while
  } // end for
  return res; // all triplets
} // end threeSum

function containerWithMostWater(h) { // max area between two lines, O(n)
  let l = 0, r = h.length - 1, best = 0; // pointers and best area
  while (l < r) { // shrink window inward
    best = Math.max(best, Math.min(h[l], h[r]) * (r - l)); // area limited by shorter wall
    if (h[l] < h[r]) l++; else r--; // move the shorter wall, it can only improve that way
  } // end while
  return best; // maximum area
} // end containerWithMostWater

console.log('pairWithSum           =', pairWithSum([1, 2, 4, 7, 11, 15], 15)); // [2,4]
const a = [1, 1, 2, 2, 3, 4, 4]; // sorted with duplicates
console.log('removeDuplicates      =', removeDuplicates(a), a.slice(0, 4)); // 4 [1,2,3,4]
console.log('threeSum              =', JSON.stringify(threeSum([-1, 0, 1, 2, -1, -4]))); // [[-1,-1,2],[-1,0,1]]
console.log('containerWithMostWater=', containerWithMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
