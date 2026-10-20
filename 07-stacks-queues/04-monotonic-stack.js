/**
 * TERM: Monotonic Stack
 * DEFINITION: A monotonic stack keeps its elements in strictly increasing or decreasing order, letting us find next/previous greater or smaller elements in O(n).
 * RELATED TERMS:
 *   - Next Greater Element (NGE), Previous Smaller Element (PSE).
 *   - Largest rectangle in histogram, daily temperatures, stock span, trapping rain water.
 * RUN: node 07-stacks-queues/04-monotonic-stack.js
 */

function nextGreaterElement(a) { // for each i, first value to the right that is greater
  const res = new Array(a.length).fill(-1), st = []; // answers and stack of indices (decreasing values)
  for (let i = 0; i < a.length; i++) { // scan left to right
    while (st.length && a[st[st.length - 1]] < a[i]) res[st.pop()] = a[i]; // a[i] is the next greater for smaller items on stack
    st.push(i); // wait for its next greater
  } // end for
  return res; // -1 where none exists
} // end nextGreaterElement

function dailyTemperatures(t) { // days to wait for a warmer temperature
  const res = new Array(t.length).fill(0), st = []; // answers and index stack
  for (let i = 0; i < t.length; i++) { // each day
    while (st.length && t[st[st.length - 1]] < t[i]) { const j = st.pop(); res[j] = i - j; } // warmer day found for j
    st.push(i); // push current day
  } // end for
  return res; // waits
} // end dailyTemperatures

function largestRectangle(h) { // largest rectangle in histogram, O(n)
  const st = []; let best = 0; // increasing stack of indices
  for (let i = 0; i <= h.length; i++) { // extra iteration with height 0 flushes the stack
    const cur = i === h.length ? 0 : h[i]; // current bar
    while (st.length && h[st[st.length - 1]] > cur) { // bar on top can't extend further right
      const height = h[st.pop()]; // its height
      const left = st.length ? st[st.length - 1] + 1 : 0; // first bar it can extend to on the left
      best = Math.max(best, height * (i - left)); // width = i - left
    } // end while
    st.push(i); // push current bar
  } // end for
  return best; // max area
} // end largestRectangle

function trapRainWater(h) { // water trapped between bars (stack method)
  const st = []; let water = 0; // stack of indices
  for (let i = 0; i < h.length; i++) { // each bar
    while (st.length && h[i] > h[st[st.length - 1]]) { // current bar closes a basin
      const bottom = st.pop(); // floor of the basin
      if (!st.length) break; // no left wall
      const left = st[st.length - 1]; // left wall index
      water += (Math.min(h[left], h[i]) - h[bottom]) * (i - left - 1); // water layer above bottom
    } // end while
    st.push(i); // push current bar
  } // end for
  return water; // total water
} // end trapRainWater

function stockSpan(prices) { // days in a row (including today) with price ≤ today
  const st = [], res = []; // stack of [price, span]
  for (const p of prices) { let span = 1; while (st.length && st[st.length - 1][0] <= p) span += st.pop()[1]; st.push([p, span]); res.push(span); } // merge smaller spans
  return res; // spans
} // end stockSpan

console.log('nextGreaterElement =', nextGreaterElement([4, 5, 2, 25])); // [5,25,25,-1]
console.log('dailyTemperatures  =', dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); // [1,1,4,2,1,1,0,0]
console.log('largestRectangle   =', largestRectangle([2, 1, 5, 6, 2, 3])); // 10
console.log('trapRainWater      =', trapRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
console.log('stockSpan          =', stockSpan([100, 80, 60, 70, 60, 75, 85])); // [1,1,1,2,1,4,6]
