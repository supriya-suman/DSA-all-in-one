/**
 * TERM: Sliding Window
 * DEFINITION: A technique that keeps a moving sub-range (window) over an array or string and updates its result incrementally instead of recomputing.
 * RELATED TERMS:
 *   - Fixed-size window: window length k never changes.
 *   - Variable-size window: expand right, shrink left while a condition is broken.
 * RUN: node 02-arrays/03-sliding-window.js
 */

function maxSumOfK(arr, k) { // fixed window: best sum of k consecutive elements, O(n)
  let windowSum = 0; // sum of current window
  for (let i = 0; i < k; i++) windowSum += arr[i]; // build the first window
  let best = windowSum; // best so far
  for (let i = k; i < arr.length; i++) { // slide window one step at a time
    windowSum += arr[i] - arr[i - k]; // add entering element, remove leaving element
    best = Math.max(best, windowSum); // update best
  } // end for
  return best; // maximum window sum
} // end maxSumOfK

function longestUniqueSubstring(s) { // variable window: longest substring without repeating chars
  const lastSeen = new Map(); // char → last index
  let left = 0, best = 0; // window start and best length
  for (let right = 0; right < s.length; right++) { // expand window to the right
    const c = s[right]; // incoming character
    if (lastSeen.has(c) && lastSeen.get(c) >= left) left = lastSeen.get(c) + 1; // shrink past the duplicate
    lastSeen.set(c, right); // record latest position
    best = Math.max(best, right - left + 1); // update best window size
  } // end for
  return best; // answer
} // end longestUniqueSubstring

function minSubarrayLen(target, nums) { // smallest window with sum ≥ target
  let left = 0, sum = 0, best = Infinity; // window state
  for (let right = 0; right < nums.length; right++) { // grow window
    sum += nums[right]; // add new element
    while (sum >= target) { // while condition holds try to shrink
      best = Math.min(best, right - left + 1); // record window length
      sum -= nums[left++]; // drop leftmost element
    } // end while
  } // end for
  return best === Infinity ? 0 : best; // 0 if impossible
} // end minSubarrayLen

function minWindowSubstring(s, t) { // smallest substring of s containing all chars of t
  const need = {}; for (const c of t) need[c] = (need[c] || 0) + 1; // required counts
  let missing = t.length, left = 0, start = 0, len = Infinity; // state
  for (let right = 0; right < s.length; right++) { // expand
    if (need[s[right]] > 0) missing--; // this char was still needed
    need[s[right]] = (need[s[right]] || 0) - 1; // consume it
    while (missing === 0) { // window is valid → shrink
      if (right - left + 1 < len) { len = right - left + 1; start = left; } // record best
      need[s[left]]++; // give back left char
      if (need[s[left]] > 0) missing++; // window became invalid
      left++; // move left edge
    } // end while
  } // end for
  return len === Infinity ? '' : s.substr(start, len); // best window
} // end minWindowSubstring

console.log('maxSumOfK(k=3)          =', maxSumOfK([2, 1, 5, 1, 3, 2], 3)); // 9
console.log('longestUniqueSubstring  =', longestUniqueSubstring('abcabcbb')); // 3
console.log('minSubarrayLen(7)       =', minSubarrayLen(7, [2, 3, 1, 2, 4, 3])); // 2
console.log('minWindowSubstring      =', minWindowSubstring('ADOBECODEBANC', 'ABC')); // BANC
