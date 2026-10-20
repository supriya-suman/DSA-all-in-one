/**
 * TERM: Monotonic Queue (Monotonic Deque)
 * DEFINITION: A deque that keeps elements in decreasing (or increasing) order so the window's max (or min) is always at the front, giving sliding window maximum in O(n).
 * RUN: node 07-stacks-queues/05-monotonic-queue.js
 */

function slidingWindowMax(nums, k) { // max of every window of size k
  const dq = [], res = []; // deque of indices with decreasing values
  let head = 0; // front pointer of dq (avoids O(n) shift)
  for (let i = 0; i < nums.length; i++) { // add each element
    if (head < dq.length && dq[head] <= i - k) head++; // drop index that slid out of the window
    while (dq.length > head && nums[dq[dq.length - 1]] <= nums[i]) dq.pop(); // smaller elements can never be max again
    dq.push(i); // add current index
    if (i >= k - 1) res.push(nums[dq[head]]); // front holds the window maximum
  } // end for
  return res; // maxima
} // end slidingWindowMax

function slidingWindowMin(nums, k) { // same idea with increasing order
  const dq = [], res = []; let head = 0; // deque of indices with increasing values
  for (let i = 0; i < nums.length; i++) { // scan
    if (head < dq.length && dq[head] <= i - k) head++; // expire old index
    while (dq.length > head && nums[dq[dq.length - 1]] >= nums[i]) dq.pop(); // keep increasing order
    dq.push(i); // add index
    if (i >= k - 1) res.push(nums[dq[head]]); // front is the minimum
  } // end for
  return res; // minima
} // end slidingWindowMin

console.log('slidingWindowMax =', slidingWindowMax([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3,3,5,5,6,7]
console.log('slidingWindowMin =', slidingWindowMin([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [-1,-3,-3,-3,3,3]
