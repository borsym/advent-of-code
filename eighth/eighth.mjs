import { readFileSync } from 'node:fs';

const lines = readFileSync('input.txt', { encoding: 'utf-8' }) // read day??.txt content
  .replace(/\r/g, '') // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split('\n'); // Split on newline
// .map(Number); // Parse each line into a number

function isGreaterThanCurrent(current, line, wayX, wayY, i, j) {
  while (i < line.length - 1 && i > 0 && j < line[i].length - 1 && j > 0) {
    i += wayX;
    j += wayY;
    if (current <= parseInt(line[i][j])) {
      return true;
    }
  }

  return false;
}

function isHidden(lines, i, j) {
  let current = parseInt(lines[i][j]);
  if (
    !(
      isGreaterThanCurrent(current, lines, +1, 0, i, j) &&
      isGreaterThanCurrent(current, lines, -1, 0, i, j) &&
      isGreaterThanCurrent(current, lines, 0, -1, i, j) &&
      isGreaterThanCurrent(current, lines, 0, +1, i, j)
    )
  ) {
    return true;
  }
  return false;
}

function part1() {
  let sum = 2 * (lines.length + lines[0].length) - 4; // edges
  for (let i = 1; i < lines.length - 1; i++) {
    for (let j = 1; j < lines[i].length - 1; j++) {
      sum += isHidden(lines, i, j) ? 1 : 0;
    }
  }
  console.log(sum);
}

function countLessThanCurrent(current, line, wayX, wayY, i, j) {
  let cnt = 0;
  while (i < line.length - 1 && i > 0 && j < line[i].length - 1 && j > 0) {
    i += wayX;
    j += wayY;
    if (current > parseInt(line[i][j])) {
      cnt++;
    }
    if (current <= parseInt(line[i][j])) {
      cnt++;
      return cnt;
    }
  }

  return cnt;
}

function getScore(lines, i, j) {
  let current = parseInt(lines[i][j]);

  const first = countLessThanCurrent(current, lines, +1, 0, i, j);
  const second = countLessThanCurrent(current, lines, -1, 0, i, j);
  const third = countLessThanCurrent(current, lines, 0, -1, i, j);
  const fourth = countLessThanCurrent(current, lines, 0, +1, i, j);
  return first * second * third * fourth;
}
function part2() {
  const sums = [];
  for (let i = 1; i < lines.length - 1; i++) {
    for (let j = 1; j < lines[i].length - 1; j++) {
      sums.push(getScore(lines, i, j));
    }
  }

  console.log(Math.max(...sums));
}

part1();
part2();
