/**
 * TERM: Array
 * DEFINITION: An array is a contiguous, index-based collection of elements giving O(1) access by position.
 * RELATED TERMS:
 *   - Static array: fixed size decided at creation.
 *   - Dynamic array: grows automatically (JS arrays, Java ArrayList, C++ vector).
 *   - Traversal, Insertion, Deletion, Update: the four basic array operations.
 *   - In-place algorithm: modifies the input using O(1) extra space.
 *   - 2D array / Matrix: array of arrays indexed by [row][col].
 * RUN: node 02-arrays/01-array-basics.js
 */

const arr = [10, 20, 30, 40, 50]; // create an array of 5 elements
console.log('access arr[2]      =', arr[2]); // O(1) random access → 30

arr[1] = 25; // update: O(1) overwrite at an index
console.log('after update       =', arr); // [10,25,30,40,50]

function insertAt(a, index, value) { // insertion in the middle is O(n)
  a.push(undefined); // grow array by one slot
  for (let i = a.length - 1; i > index; i--) a[i] = a[i - 1]; // shift elements right
  a[index] = value; // place new value in the gap
  return a; // modified array
} // end insertAt
console.log('insertAt(2, 99)    =', insertAt([...arr], 2, 99)); // [10,25,99,30,40,50]

function deleteAt(a, index) { // deletion in the middle is O(n)
  for (let i = index; i < a.length - 1; i++) a[i] = a[i + 1]; // shift elements left
  a.length--; // drop the duplicated last element
  return a; // modified array
} // end deleteAt
console.log('deleteAt(0)        =', deleteAt([...arr], 0)); // [25,30,40,50]

function reverseInPlace(a) { // in-place reversal with two indices
  for (let i = 0, j = a.length - 1; i < j; i++, j--) [a[i], a[j]] = [a[j], a[i]]; // swap ends moving inward
  return a; // reversed array
} // end reverseInPlace
console.log('reverseInPlace     =', reverseInPlace([1, 2, 3, 4, 5])); // [5,4,3,2,1]

function rotateRight(a, k) { // rotate by k using the reversal trick, O(n) time O(1) space
  k %= a.length; // handle k larger than length
  const rev = (l, r) => { while (l < r) { [a[l], a[r]] = [a[r], a[l]]; l++; r--; } }; // helper reverses a[l..r]
  rev(0, a.length - 1); // reverse whole array
  rev(0, k - 1); // reverse first k
  rev(k, a.length - 1); // reverse the rest
  return a; // rotated array
} // end rotateRight
console.log('rotateRight(2)     =', rotateRight([1, 2, 3, 4, 5], 2)); // [4,5,1,2,3]

const matrix = [[1, 2, 3], [4, 5, 6]]; // 2D array with 2 rows and 3 columns
console.log('matrix[1][2]       =', matrix[1][2]); // 6
const transposed = matrix[0].map((_, c) => matrix.map(row => row[c])); // swap rows and columns
console.log('transpose          =', JSON.stringify(transposed)); // [[1,4],[2,5],[3,6]]
