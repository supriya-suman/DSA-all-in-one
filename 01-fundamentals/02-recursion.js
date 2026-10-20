/**
 * TERM: Recursion
 * DEFINITION: Recursion is when a function solves a problem by calling itself on a smaller version of the same problem.
 * RELATED TERMS:
 *   - Base case: the condition that stops recursion.
 *   - Recursive case: the step that calls the function on a smaller input.
 *   - Call stack: memory where each active function call is stored; too deep recursion causes stack overflow.
 *   - Tail recursion: recursion where the recursive call is the very last action.
 *   - Head recursion: the recursive call happens before other work in the function.
 *   - Tree recursion: a function makes more than one recursive call (e.g. Fibonacci).
 *   - Indirect (mutual) recursion: A calls B and B calls A.
 * RUN: node 01-fundamentals/02-recursion.js
 */
// My world
function factorial(n) { // n! = n * (n-1) * ... * 1
  if (n <= 1) return 1; // base case: 0! = 1! = 1
  return n * factorial(n - 1); // recursive case: shrink n by 1
} // end factorial

function factorialTail(n, acc = 1) { // tail-recursive version carries the answer in acc
  if (n <= 1) return acc; // base case returns accumulated result
  return factorialTail(n - 1, acc * n); // recursive call is the last action (tail call)
} // end factorialTail

function printHead(n) { // head recursion: recurse first, then work
  if (n === 0) return; // base case
  printHead(n - 1); // recursive call happens first
  process.stdout.write(n + ' '); // work happens while stack unwinds → prints 1..n
} // end printHead

function fib(n) { // tree recursion: two calls per level
  if (n < 2) return n; // base cases fib(0)=0, fib(1)=1
  return fib(n - 1) + fib(n - 2); // two recursive branches
} // end fib

function isEven(n) { return n === 0 ? true : isOdd(n - 1); } // indirect recursion: isEven calls isOdd
function isOdd(n) { return n === 0 ? false : isEven(n - 1); } // isOdd calls isEven back

function sumDigits(n) { // simple recursion on digits
  if (n < 10) return n; // base case: single digit
  return (n % 10) + sumDigits(Math.floor(n / 10)); // last digit + sum of remaining digits
} // end sumDigits

function towerOfHanoi(n, from, to, via, moves = []) { // classic recursion puzzle, O(2^n) moves
  if (n === 0) return moves; // base case: no disk to move
  towerOfHanoi(n - 1, from, via, to, moves); // move n-1 disks out of the way
  moves.push(`${from}->${to}`); // move the biggest disk
  towerOfHanoi(n - 1, via, to, from, moves); // move n-1 disks on top of it
  return moves; // list of all moves
} // end towerOfHanoi

console.log('factorial(5)     =', factorial(5)); // 120
console.log('factorialTail(5) =', factorialTail(5)); // 120
process.stdout.write('head recursion   = '); printHead(5); console.log(); // 1 2 3 4 5
console.log('fib(10)          =', fib(10)); // 55
console.log('isEven(10)       =', isEven(10)); // true
console.log('sumDigits(1234)  =', sumDigits(1234)); // 10
console.log('hanoi(3)         =', towerOfHanoi(3, 'A', 'C', 'B').join(' ')); // 7 moves
