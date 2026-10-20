/**
 * TERM: Big-O / Time & Space Complexity
 * DEFINITION: Big-O describes how an algorithm's running time or memory grows as the input size n grows (worst case upper bound).
 * RELATED TERMS:
 *   - Big-Omega (Ω): lower bound (best case growth).
 *   - Big-Theta (Θ): tight bound (upper and lower bound are the same).
 *   - Amortized complexity: average cost per operation over a long sequence of operations.
 *   - Auxiliary space: extra memory used by the algorithm, excluding the input.
 * RUN: node 01-fundamentals/01-big-o-complexity.js
 */

function constantTime(arr) { // O(1): does the same work no matter how big arr is
  return arr[0]; // reading one index is a single step
} // end constantTime

function logarithmicTime(n) { // O(log n): input is halved every step
  let steps = 0; // counts how many times we halve
  while (n > 1) { // keep going until n shrinks to 1
    n = Math.floor(n / 2); // halve n (this is why it is log base 2)
    steps++; // record one step
  } // end while
  return steps; // number of halvings ≈ log2(n)
} // end logarithmicTime

function linearTime(arr) { // O(n): touches every element once
  let sum = 0; // running total
  for (const x of arr) sum += x; // one addition per element → n steps
  return sum; // total of all elements
} // end linearTime

function linearithmicTime(arr) { // O(n log n): typical of efficient sorting
  return [...arr].sort((a, b) => a - b); // built-in sort is O(n log n)
} // end linearithmicTime

function quadraticTime(arr) { // O(n^2): nested loop over the same input
  let pairs = 0; // counts pairs
  for (let i = 0; i < arr.length; i++) { // outer loop runs n times
    for (let j = i + 1; j < arr.length; j++) pairs++; // inner loop runs up to n times
  } // end outer loop
  return pairs; // n*(n-1)/2 pairs
} // end quadraticTime

function exponentialTime(n) { // O(2^n): each call branches into two calls
  if (n <= 1) return n; // base case stops recursion
  return exponentialTime(n - 1) + exponentialTime(n - 2); // two branches per call
} // end exponentialTime

function amortizedPushDemo() { // Amortized O(1): JS array push occasionally resizes but is cheap on average
  const a = []; // dynamic array
  for (let i = 0; i < 1000; i++) a.push(i); // most pushes are O(1); rare resizes are O(n), average is O(1)
  return a.length; // 1000 elements stored
} // end amortizedPushDemo

console.log('O(1)       →', constantTime([7, 8, 9])); // prints 7
console.log('O(log n)   →', logarithmicTime(1024), 'halvings for n=1024'); // prints 10
console.log('O(n)       →', linearTime([1, 2, 3, 4])); // prints 10
console.log('O(n log n) →', linearithmicTime([5, 1, 4, 2])); // prints sorted array
console.log('O(n^2)     →', quadraticTime([1, 2, 3, 4, 5]), 'pairs'); // prints 10
console.log('O(2^n)     →', exponentialTime(10)); // prints 55 (slow for big n)
console.log('Amortized  →', amortizedPushDemo(), 'pushes'); // prints 1000
