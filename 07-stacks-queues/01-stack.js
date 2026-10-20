/**
 * TERM: Stack (LIFO)
 * DEFINITION: A stack is a Last-In-First-Out collection where push and pop happen only at the top, both in O(1).
 * RELATED TERMS:
 *   - push / pop / peek (top) / isEmpty: core operations.
 *   - Stack overflow / underflow: pushing to a full stack / popping an empty one.
 *   - Infix, Prefix (Polish), Postfix (Reverse Polish) notation: operator placement styles.
 *   - Min stack: stack that also returns its minimum in O(1).
 * RUN: node 07-stacks-queues/01-stack.js
 */

class Stack { // array-backed stack
  constructor() { this.items = []; } // storage
  push(x) { this.items.push(x); } // add on top, O(1)
  pop() { if (this.isEmpty()) throw new Error('Stack underflow'); return this.items.pop(); } // remove top, O(1)
  peek() { return this.items[this.items.length - 1]; } // look at top without removing
  isEmpty() { return this.items.length === 0; } // check emptiness
  size() { return this.items.length; } // number of items
} // end Stack

function isBalanced(expr) { // valid parentheses check
  const pairs = { ')': '(', ']': '[', '}': '{' }; // closing → opening
  const st = new Stack(); // holds opening brackets
  for (const c of expr) { // scan characters
    if ('([{'.includes(c)) st.push(c); // opening bracket → push
    else if (c in pairs) { if (st.isEmpty() || st.pop() !== pairs[c]) return false; } // closing must match top
  } // end for
  return st.isEmpty(); // leftover openings mean unbalanced
} // end isBalanced

function infixToPostfix(expr) { // Shunting-yard algorithm (single-char operands)
  const prec = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 }; // operator precedence
  const out = [], ops = new Stack(); // output and operator stack
  for (const c of expr.replace(/\s/g, '')) { // ignore spaces
    if (/[a-z0-9]/i.test(c)) out.push(c); // operand goes straight to output
    else if (c === '(') ops.push(c); // remember open parenthesis
    else if (c === ')') { while (ops.peek() !== '(') out.push(ops.pop()); ops.pop(); } // pop until '('
    else { // operator
      while (!ops.isEmpty() && ops.peek() !== '(' && (prec[ops.peek()] > prec[c] || (prec[ops.peek()] === prec[c] && c !== '^'))) out.push(ops.pop()); // pop higher/equal precedence (^ is right-associative)
      ops.push(c); // push current operator
    } // end if
  } // end for
  while (!ops.isEmpty()) out.push(ops.pop()); // flush remaining operators
  return out.join(''); // postfix string
} // end infixToPostfix

function evalPostfix(tokens) { // evaluate Reverse Polish Notation
  const st = new Stack(); // operand stack
  for (const t of tokens) { // each token
    if (!isNaN(t)) { st.push(Number(t)); continue; } // number → push
    const b = st.pop(), a = st.pop(); // pop two operands (b on top)
    st.push(t === '+' ? a + b : t === '-' ? a - b : t === '*' ? a * b : Math.trunc(a / b)); // apply operator
  } // end for
  return st.pop(); // final result
} // end evalPostfix

class MinStack { // O(1) getMin
  constructor() { this.st = []; } // stores [value, minSoFar]
  push(x) { const m = this.st.length ? Math.min(x, this.getMin()) : x; this.st.push([x, m]); } // carry running min
  pop() { return this.st.pop()[0]; } // remove top
  getMin() { return this.st[this.st.length - 1][1]; } // min at top
} // end MinStack

const s = new Stack(); s.push(1); s.push(2); s.push(3); // stack 1 2 3 (3 on top)
console.log('pop / peek       =', s.pop(), '/', s.peek()); // 3 / 2
console.log('isBalanced       =', isBalanced('{[()]}'), isBalanced('([)]')); // true false
console.log('infixToPostfix   =', infixToPostfix('a+b*(c^d-e)^(f+g*h)-i')); // abcd^e-fgh*+^*+i-
console.log('evalPostfix      =', evalPostfix(['2', '1', '+', '3', '*'])); // 9
const ms = new MinStack(); ms.push(5); ms.push(2); ms.push(8); // min is 2
console.log('MinStack getMin  =', ms.getMin()); // 2
