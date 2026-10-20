/**
 * TERM: Kadane's Algorithm (Maximum Subarray Sum)
 * DEFINITION: Kadane's algorithm finds the maximum-sum contiguous subarray in O(n) by deciding at each index to extend the current run or start fresh.
 * RELATED TERMS:
 *   - Subarray: contiguous part of an array.  Subsequence: elements in order, not necessarily contiguous.
 *   - Maximum product subarray: Kadane variant tracking both max and min.
 * RUN: node 02-arrays/05-kadane-algorithm.js
 */

function kadane(nums) { // returns best sum and its range
  let best = nums[0], current = nums[0]; // best overall and best ending here
  let start = 0, tempStart = 0, end = 0; // track subarray boundaries
  for (let i = 1; i < nums.length; i++) { // scan from second element
    if (nums[i] > current + nums[i]) { current = nums[i]; tempStart = i; } // starting fresh is better
    else current += nums[i]; // extending is better
    if (current > best) { best = current; start = tempStart; end = i; } // new global best
  } // end for
  return { best, subarray: nums.slice(start, end + 1) }; // result
} // end kadane

function maxProductSubarray(nums) { // negative numbers flip max/min
  let maxHere = nums[0], minHere = nums[0], best = nums[0]; // trackers
  for (let i = 1; i < nums.length; i++) { // scan
    const x = nums[i]; // current number
    const candidates = [x, maxHere * x, minHere * x]; // start new, extend max, extend min
    maxHere = Math.max(...candidates); // best product ending here
    minHere = Math.min(...candidates); // worst product ending here (may become best later)
    best = Math.max(best, maxHere); // update answer
  } // end for
  return best; // max product
} // end maxProductSubarray

function maxCircularSubarray(nums) { // wrap-around allowed
  const total = nums.reduce((a, b) => a + b, 0); // total sum
  const maxNormal = kadane(nums).best; // best without wrap
  const minNormal = -kadane(nums.map(x => -x)).best; // smallest subarray sum
  return maxNormal < 0 ? maxNormal : Math.max(maxNormal, total - minNormal); // wrap = total minus worst middle
} // end maxCircularSubarray

console.log('kadane              =', kadane([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // best 6 [4,-1,2,1]
console.log('maxProductSubarray  =', maxProductSubarray([2, 3, -2, 4])); // 6
console.log('maxCircularSubarray =', maxCircularSubarray([5, -3, 5])); // 10
