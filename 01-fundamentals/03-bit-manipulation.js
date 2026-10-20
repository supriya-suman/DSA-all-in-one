/**
 * TERM: Bit Manipulation
 * DEFINITION: Bit manipulation solves problems by directly operating on the binary bits of numbers using bitwise operators.
 * RELATED TERMS:
 *   - AND (&), OR (|), XOR (^), NOT (~), Left shift (<<), Right shift (>>), Unsigned right shift (>>>).
 *   - Bitmask: an integer whose bits represent a set of on/off flags.
 *   - Set bit: a bit whose value is 1.  Popcount: number of set bits.
 *   - Two's complement: how negative integers are stored (invert bits + 1).
 * RUN: node 01-fundamentals/03-bit-manipulation.js
 */

const isBitSet = (n, i) => ((n >> i) & 1) === 1; // shift bit i to position 0 and test it
const setBit = (n, i) => n | (1 << i); // OR with a mask turns bit i on
const clearBit = (n, i) => n & ~(1 << i); // AND with inverted mask turns bit i off
const toggleBit = (n, i) => n ^ (1 << i); // XOR flips bit i
const isPowerOfTwo = (n) => n > 0 && (n & (n - 1)) === 0; // power of two has exactly one set bit
const lowestSetBit = (n) => n & -n; // two's complement trick isolates the rightmost 1

function popcount(n) { // Brian Kernighan's algorithm: count set bits
  let count = 0; // number of 1s found
  while (n) { // loop until all bits are cleared
    n &= n - 1; // removes the lowest set bit each iteration
    count++; // count that bit
  } // end while
  return count; // total set bits
} // end popcount

function singleNumber(arr) { // every number appears twice except one
  return arr.reduce((acc, x) => acc ^ x, 0); // x ^ x = 0 and x ^ 0 = x, so pairs cancel
} // end singleNumber

function swapWithXor(a, b) { // swap two numbers without a temp variable
  a = a ^ b; // a now holds a^b
  b = a ^ b; // (a^b)^b = a
  a = a ^ b; // (a^b)^a = b
  return [a, b]; // swapped pair
} // end swapWithXor

function allSubsetsWithBitmask(items) { // each mask from 0..2^n-1 picks a subset
  const result = []; // list of subsets
  for (let mask = 0; mask < (1 << items.length); mask++) { // 2^n masks
    result.push(items.filter((_, i) => mask & (1 << i))); // include item i if bit i is on
  } // end for
  return result; // all subsets
} // end allSubsetsWithBitmask

console.log('5 in binary          =', (5).toString(2)); // 101
console.log('isBitSet(5,2)        =', isBitSet(5, 2)); // true
console.log('setBit(5,1)          =', setBit(5, 1)); // 7
console.log('clearBit(5,0)        =', clearBit(5, 0)); // 4
console.log('toggleBit(5,2)       =', toggleBit(5, 2)); // 1
console.log('isPowerOfTwo(64)     =', isPowerOfTwo(64)); // true
console.log('lowestSetBit(12)     =', lowestSetBit(12)); // 4
console.log('popcount(29)         =', popcount(29)); // 4
console.log('singleNumber         =', singleNumber([4, 1, 2, 1, 2])); // 4
console.log('swapWithXor(3,9)     =', swapWithXor(3, 9)); // [9,3]
console.log('~5 (two\'s complement) =', ~5); // -6
console.log('-8 >> 1 vs -8 >>> 28 =', -8 >> 1, -8 >>> 28); // sign-preserving vs unsigned shift
console.log('subsets of [a,b,c]   =', JSON.stringify(allSubsetsWithBitmask(['a', 'b', 'c']))); // 8 subsets
