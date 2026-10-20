/**
 * TERM: Backtracking (Subsets, Permutations, Combinations)
 * DEFINITION: Backtracking builds a solution step by step, and undoes (backtracks) the last choice when it can't lead to a valid answer, exploring a decision tree.
 * RELATED TERMS:
 *   - Choose → Explore → Un-choose: the backtracking template.
 *   - Pruning: cutting branches that cannot succeed.
 *   - State space tree: tree of all partial choices.
 *   - Power set: all 2^n subsets.  Permutations: n! orderings.  Combinations: nCk selections.
 * RUN: node 15-backtracking/01-subsets-permutations-combinations.js
 */

function subsets(nums) { // power set
  const res = [], path = []; // results and current subset
  const bt = (start) => { res.push([...path]); for (let i = start; i < nums.length; i++) { path.push(nums[i]); bt(i + 1); path.pop(); } }; // record, then choose/explore/unchoose
  bt(0); return res; // 2^n subsets
} // end subsets

function subsetsWithDup(nums) { // unique subsets when input has duplicates
  nums = [...nums].sort((a, b) => a - b); const res = [], path = []; // sort so duplicates are adjacent
  const bt = (start) => { res.push([...path]); for (let i = start; i < nums.length; i++) { if (i > start && nums[i] === nums[i - 1]) continue; path.push(nums[i]); bt(i + 1); path.pop(); } }; // skip duplicate at same depth
  bt(0); return res; // unique subsets
} // end subsetsWithDup

function permutations(nums) { // all orderings
  const res = [], used = new Array(nums.length).fill(false), path = []; // track used elements
  const bt = () => { if (path.length === nums.length) { res.push([...path]); return; } for (let i = 0; i < nums.length; i++) { if (used[i]) continue; used[i] = true; path.push(nums[i]); bt(); path.pop(); used[i] = false; } }; // pick any unused
  bt(); return res; // n! permutations
} // end permutations

function combine(n, k) { // choose k numbers from 1..n
  const res = [], path = []; // results
  const bt = (start) => { if (path.length === k) { res.push([...path]); return; } for (let i = start; i <= n - (k - path.length) + 1; i++) { path.push(i); bt(i + 1); path.pop(); } }; // prune: need enough numbers left
  bt(1); return res; // nCk combinations
} // end combine

function combinationSum(cands, target) { // reuse allowed, sum to target
  const res = [], path = []; cands = [...cands].sort((a, b) => a - b); // sorted for pruning
  const bt = (start, rem) => { if (rem === 0) { res.push([...path]); return; } for (let i = start; i < cands.length && cands[i] <= rem; i++) { path.push(cands[i]); bt(i, rem - cands[i]); path.pop(); } }; // i (not i+1) allows reuse
  bt(0, target); return res; // all combinations
} // end combinationSum

function letterCombinations(digits) { // phone keypad mapping
  const map = { 2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz' }, res = []; // keypad
  const bt = (i, s) => { if (i === digits.length) { if (s) res.push(s); return; } for (const c of map[digits[i]]) bt(i + 1, s + c); }; // one letter per digit
  bt(0, ''); return res; // combinations
} // end letterCombinations

function generateParentheses(n) { // all balanced strings of n pairs
  const res = []; const bt = (s, open, close) => { if (s.length === 2 * n) { res.push(s); return; } if (open < n) bt(s + '(', open + 1, close); if (close < open) bt(s + ')', open, close + 1); }; // close only if it stays valid
  bt('', 0, 0); return res; // Catalan(n) strings
} // end generateParentheses

console.log('subsets([1,2,3])        =', JSON.stringify(subsets([1, 2, 3]))); // 8 subsets
console.log('subsetsWithDup([1,2,2]) =', JSON.stringify(subsetsWithDup([1, 2, 2]))); // 6 subsets
console.log('permutations([1,2,3])   =', JSON.stringify(permutations([1, 2, 3]))); // 6 permutations
console.log('combine(4,2)            =', JSON.stringify(combine(4, 2))); // 6 combinations
console.log('combinationSum          =', JSON.stringify(combinationSum([2, 3, 6, 7], 7))); // [[2,2,3],[7]]
console.log('letterCombinations("23")=', letterCombinations('23').join(' ')); // 9 strings
console.log('generateParentheses(3)  =', generateParentheses(3).join(' ')); // 5 strings
