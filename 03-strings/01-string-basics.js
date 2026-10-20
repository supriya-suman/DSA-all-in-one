/**
 * TERM: String
 * DEFINITION: A string is a sequence of characters; in JS strings are immutable, so every "change" creates a new string.
 * RELATED TERMS:
 *   - Substring: contiguous part of a string.  Subsequence: characters in order, gaps allowed.
 *   - Palindrome: reads the same forwards and backwards.
 *   - Anagram: same characters with the same counts in a different order.
 *   - Frequency count: map/array counting each character.
 *   - Longest common prefix (LCP): longest start shared by all strings.
 * RUN: node 03-strings/01-string-basics.js
 */

function isPalindrome(s) { // ignore case and non-alphanumerics
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, ''); // normalize the string
  let i = 0, j = clean.length - 1; // two pointers at the ends
  while (i < j) if (clean[i++] !== clean[j--]) return false; // mismatch means not a palindrome
  return true; // all pairs matched
} // end isPalindrome

function isAnagram(a, b) { // compare character frequencies, O(n)
  if (a.length !== b.length) return false; // lengths must match
  const count = new Array(26).fill(0); // counts for 'a'..'z'
  for (let i = 0; i < a.length; i++) { // walk both strings together
    count[a.charCodeAt(i) - 97]++; // add char from a
    count[b.charCodeAt(i) - 97]--; // remove char from b
  } // end for
  return count.every(c => c === 0); // all balanced → anagram
} // end isAnagram

function groupAnagrams(words) { // group words by sorted signature
  const groups = new Map(); // signature → words
  for (const w of words) { // process each word
    const key = [...w].sort().join(''); // sorted letters are the same for anagrams
    if (!groups.has(key)) groups.set(key, []); // create group
    groups.get(key).push(w); // add word
  } // end for
  return [...groups.values()]; // list of groups
} // end groupAnagrams

const reverseWords = (s) => s.trim().split(/\s+/).reverse().join(' '); // split on spaces, reverse, join

function longestCommonPrefix(strs) { // vertical scan
  if (!strs.length) return ''; // no strings
  for (let i = 0; i < strs[0].length; i++) { // each column of the first word
    for (const s of strs) if (s[i] !== strs[0][i]) return strs[0].slice(0, i); // mismatch ends prefix
  } // end for
  return strs[0]; // whole first word is the prefix
} // end longestCommonPrefix

function isSubsequence(sub, s) { // check if sub appears in order inside s
  let i = 0; // pointer into sub
  for (const c of s) if (c === sub[i]) i++; // advance when characters match
  return i === sub.length; // consumed all of sub
} // end isSubsequence

function compress(s) { // run-length encoding: aaabb → a3b2
  let out = ''; // result
  for (let i = 0; i < s.length; ) { // i jumps over runs
    let j = i; while (j < s.length && s[j] === s[i]) j++; // find end of run
    out += s[i] + (j - i); // char + run length
    i = j; // next run
  } // end for
  return out; // encoded string
} // end compress

console.log('isPalindrome        =', isPalindrome('A man, a plan, a canal: Panama')); // true
console.log('isAnagram           =', isAnagram('listen', 'silent')); // true
console.log('groupAnagrams       =', JSON.stringify(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))); // 3 groups
console.log('reverseWords        =', reverseWords('  the sky  is blue ')); // blue is sky the
console.log('longestCommonPrefix =', longestCommonPrefix(['flower', 'flow', 'flight'])); // fl
console.log('isSubsequence       =', isSubsequence('ace', 'abcde')); // true
console.log('run-length encoding =', compress('aaabbc')); // a3b2c1
