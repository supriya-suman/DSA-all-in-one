/**
 * TERM: Interval Problems (Merge, Insert, Meeting Rooms, Non-overlapping)
 * DEFINITION: Interval problems work on [start, end] ranges, usually by sorting by start or end and sweeping once.
 * RELATED TERMS:
 *   - Overlap condition: a.start < b.end && b.start < a.end.
 *   - Sweep line: process start/end events in sorted order.
 *   - Meeting rooms II: minimum rooms = max overlapping intervals at any time.
 * RUN: node 14-greedy/03-interval-problems.js
 */

function mergeIntervals(iv) { // merge all overlapping intervals
  const s = [...iv].sort((a, b) => a[0] - b[0]), out = []; // sort by start
  for (const [a, b] of s) { if (out.length && a <= out[out.length - 1][1]) out[out.length - 1][1] = Math.max(out[out.length - 1][1], b); else out.push([a, b]); } // extend or start new
  return out; // merged list
} // end mergeIntervals

function insertInterval(iv, nw) { // iv is sorted and non-overlapping
  const out = []; let i = 0; // result and pointer
  while (i < iv.length && iv[i][1] < nw[0]) out.push(iv[i++]); // intervals completely before
  while (i < iv.length && iv[i][0] <= nw[1]) { nw = [Math.min(nw[0], iv[i][0]), Math.max(nw[1], iv[i][1])]; i++; } // merge overlaps
  out.push(nw); while (i < iv.length) out.push(iv[i++]); // add merged and the rest
  return out; // new list
} // end insertInterval

function minMeetingRooms(iv) { // sweep line with sorted starts and ends
  const starts = iv.map(x => x[0]).sort((a, b) => a - b), ends = iv.map(x => x[1]).sort((a, b) => a - b); // events
  let rooms = 0, best = 0, e = 0; // current rooms, max rooms, end pointer
  for (const s of starts) { while (ends[e] <= s) { rooms--; e++; } rooms++; best = Math.max(best, rooms); } // free finished rooms then allocate
  return best; // rooms needed
} // end minMeetingRooms

function eraseOverlapIntervals(iv) { // fewest removals to make non-overlapping
  const s = [...iv].sort((a, b) => a[1] - b[1]); let end = -Infinity, removed = 0; // sort by end (activity selection)
  for (const [a, b] of s) { if (a >= end) end = b; else removed++; } // keep if compatible else remove
  return removed; // removals
} // end eraseOverlapIntervals

function minArrowsToBurstBalloons(points) { // arrows needed for overlapping ranges
  const s = [...points].sort((a, b) => a[1] - b[1]); let arrows = 0, pos = -Infinity; // sort by end
  for (const [a, b] of s) if (a > pos) { arrows++; pos = b; } // new arrow at this balloon's end
  return arrows; // count
} // end minArrowsToBurstBalloons

console.log('mergeIntervals        =', JSON.stringify(mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]))); // [[1,6],[8,10],[15,18]]
console.log('insertInterval        =', JSON.stringify(insertInterval([[1, 2], [3, 5], [6, 7], [8, 10]], [4, 8]))); // [[1,2],[3,10]]
console.log('minMeetingRooms       =', minMeetingRooms([[0, 30], [5, 10], [15, 20]])); // 2
console.log('eraseOverlapIntervals =', eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])); // 1
console.log('minArrows             =', minArrowsToBurstBalloons([[10, 16], [2, 8], [1, 6], [7, 12]])); // 2
