/**
 * TERM: Linear (1D) DP Patterns (House Robber, Decode Ways, Word Break, Jump Game II)
 * DEFINITION: 1D DP problems where dp[i] depends on a few earlier positions of a sequence.
 * RELATED TERMS:
 *   - Take / skip decision, counting decodings, segmenting strings with a dictionary.
 * RUN: node 13-dynamic-programming/07-linear-dp-problems.js
 */

function houseRobber(nums) { // can't rob adjacent houses
  let skip = 0, take = 0; // best without/with robbing previous house
  for (const x of nums) [skip, take] = [Math.max(skip, take), skip + x]; // rob current only if previous skipped
  return Math.max(skip, take); // best overall
} // end houseRobber

function houseRobberCircular(nums) { // first and last are neighbours
  if (nums.length === 1) return nums[0]; // single house
  return Math.max(houseRobber(nums.slice(1)), houseRobber(nums.slice(0, -1))); // exclude first or exclude last
} // end houseRobberCircular

function decodeWays(s) { // 'A'=1 … 'Z'=26
  let prev2 = 1, prev1 = s[0] === '0' ? 0 : 1; // ways for empty prefix and first char
  for (let i = 2; i <= s.length; i++) { // build up
    let cur = 0; // ways for prefix of length i
    if (s[i - 1] !== '0') cur += prev1; // single digit decode
    const two = Number(s.slice(i - 2, i)); if (two >= 10 && two <= 26) cur += prev2; // two digit decode
    [prev2, prev1] = [prev1, cur]; // shift window
  } // end for
  return prev1; // total ways
} // end decodeWays

function wordBreak(s, dict) { // can s be segmented into dictionary words?
  const words = new Set(dict), dp = new Array(s.length + 1).fill(false); dp[0] = true; // empty prefix is valid
  for (let i = 1; i <= s.length; i++) for (let j = 0; j < i; j++) if (dp[j] && words.has(s.slice(j, i))) { dp[i] = true; break; } // valid prefix + dictionary word
  return dp[s.length]; // whole string valid?
} // end wordBreak

function minJumps(nums) { // fewest jumps to reach end (greedy BFS-levels DP)
  let jumps = 0, curEnd = 0, farthest = 0; // current range end and farthest reach
  for (let i = 0; i < nums.length - 1; i++) { farthest = Math.max(farthest, i + nums[i]); if (i === curEnd) { jumps++; curEnd = farthest; } } // finish a level → jump
  return jumps; // minimum jumps
} // end minJumps

console.log('houseRobber         =', houseRobber([2, 7, 9, 3, 1])); // 12
console.log('houseRobberCircular =', houseRobberCircular([2, 3, 2])); // 3
console.log('decodeWays("226")   =', decodeWays('226')); // 3
console.log('wordBreak           =', wordBreak('leetcode', ['leet', 'code'])); // true
console.log('minJumps            =', minJumps([2, 3, 1, 1, 4])); // 2
