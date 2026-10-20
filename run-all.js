/**
 * RUNNER: runs every lesson file (or only the ones matching a filter) and prints a pass/fail summary.
 * USAGE:
 *   node run-all.js              → run everything
 *   node run-all.js sorting      → run only files whose path contains "sorting"
 *   node run-all.js --list       → just list all lesson files and their TERM
 *   node run-all.js --quiet      → hide program output, show only pass/fail
 */

const fs = require('fs'); // file system module to read folders
const path = require('path'); // helps build file paths safely on Windows/Mac/Linux
const { spawnSync } = require('child_process'); // runs another Node process and waits for it

const ROOT = __dirname; // folder this file lives in
const args = process.argv.slice(2); // command-line arguments after "node run-all.js"
const listOnly = args.includes('--list'); // list mode flag
const quiet = args.includes('--quiet'); // quiet mode flag
const filter = args.find(a => !a.startsWith('--')) || ''; // first non-flag argument is the filter text

const categories = fs.readdirSync(ROOT).filter(d => /^\d{2}-/.test(d) && fs.statSync(path.join(ROOT, d)).isDirectory()).sort(); // folders like 01-fundamentals
const files = categories.flatMap(cat => fs.readdirSync(path.join(ROOT, cat)).filter(f => f.endsWith('.js')).sort().map(f => path.join(cat, f))); // every lesson file in order
const selected = files.filter(f => f.toLowerCase().includes(filter.toLowerCase())); // apply filter (empty filter keeps all)

const termOf = (file) => { const m = fs.readFileSync(path.join(ROOT, file), 'utf8').match(/TERM:\s*(.+)/); return m ? m[1].trim() : ''; }; // read the TERM line from the header

if (listOnly) { // --list: print a table of contents
  let current = ''; // track category headings
  for (const f of selected) { const cat = path.dirname(f); if (cat !== current) { console.log(`\n${cat}`); current = cat; } console.log(`  ${path.basename(f).padEnd(48)} ${termOf(f)}`); } // print each file with its term
  console.log(`\n${selected.length} lesson files`); // total
  process.exit(0); // done
} // end list mode

let passed = 0; const failed = []; // counters
for (const f of selected) { // run each file
  if (!quiet) console.log(`\n\x1b[36m━━━ ${f}  —  ${termOf(f)}\x1b[0m`); // coloured heading
  const r = spawnSync(process.execPath, [path.join(ROOT, f)], { encoding: 'utf8', timeout: 30000 }); // run with the same Node binary, 30s limit
  if (!quiet) process.stdout.write(r.stdout); // show program output
  if (r.status === 0) passed++; else { failed.push(f); console.log(`\x1b[31mFAILED: ${f}\n${r.stderr}\x1b[0m`); } // record result
} // end for

console.log(`\n\x1b[32m✔ ${passed} passed\x1b[0m${failed.length ? `  \x1b[31m✘ ${failed.length} failed\x1b[0m` : ''}  (of ${selected.length} files)`); // summary line
process.exit(failed.length ? 1 : 0); // non-zero exit code if anything failed
