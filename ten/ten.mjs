import { readFileSync } from 'node:fs';

const lines = readFileSync('input.txt', { encoding: 'utf-8' }) // read day??.txt content
  .replace(/\r/g, '') // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split('\n') // Split on newline
  .map((line) => {
    const [instruction, value] = line.split(' ');
    if (instruction === 'noop') {
      return [instruction, 0];
    }
    return [instruction, parseInt(value)];
  });
// .map(Number); // Parse each line into a number

// if (cycle % 40 === 20) {
//   sum += X * cycle;
// }
function isCyclePeriod(cycle) {
  return cycle % 40 === 20;
}

function CyclePeriodWithSum(cycle, sum, X) {
  for (let j = 0; j < 2; j++) {
    cycle++;
    sum += isCyclePeriod(cycle) ? X * cycle : 0;
  }
  return { cycle, sum };
}

function part1() {
  let X = 1;
  let cycle = 0;
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    const [instruction, value] = lines[i];
    if (instruction === 'noop') {
      cycle++;
      sum += isCyclePeriod(cycle) ? X * cycle : 0;
    } else {
      ({ cycle, sum } = CyclePeriodWithSum(cycle, sum, X));
      X += value;
    }
  }

  console.log(sum);
}

// sprite 3 pixel wide X sets the middle element position
// 40 wide 6 height
// left most 0 right most 39
// cycle index
// ### X is always in the middle of the 3 pixels

// I just need to know the start and end index of the three ### pixels

function getSymble(X, currentIdx) {
  if (currentIdx === X || currentIdx - 1 === X || currentIdx + 1 === X)
    return '#';

  return '.';
}

function changePeriod(cycle, rowIdx, currentIdx) {
  if (cycle % 40 === 0) {
    rowIdx++;
    currentIdx = 0;
  }
  return { rowIdx, currentIdx };
}

function part2() {
  let X = 1; // X is always in the middle of the 3 pixels #0 #1X #2
  let cycle = 0;
  let rowIdx = 0;
  let currentIdx = 0;

  const grid = new Array(6).fill('.').map(() => new Array(40).fill('.'));
  for (let i = 0; i < lines.length; i++) {
    const [instruction, value] = lines[i];
    if (instruction === 'noop') {
      grid[rowIdx][currentIdx] = getSymble(X, currentIdx);
      cycle++;
      currentIdx++;
      ({ rowIdx, currentIdx } = changePeriod(cycle, rowIdx, currentIdx));
    } else {
      for (let j = 0; j < 2; j++) {
        grid[rowIdx][currentIdx] = getSymble(X, currentIdx);
        cycle++;
        currentIdx++;
        ({ rowIdx, currentIdx } = changePeriod(cycle, rowIdx, currentIdx));
      }
      X += value;
    }
  }
  grid.map((row) => console.log(row.join('')));
}

part1();
part2();
