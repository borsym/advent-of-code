import { readFileSync } from 'node:fs';

const lines = readFileSync('input.txt', { encoding: 'utf-8' }) // read day??.txt content
  .replace(/\r/g, '') // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split('\n');

function part1() {
  //do something here
  const result = lines.map((line) => {
    const [interval1, interval2] = line
      .split(',')
      .map((interval) => interval.split('-').map(Number))
      .sort((a, b) => {
        const oneSize = a[1] - a[0];
        const twoSize = b[1] - b[0];
        return twoSize - oneSize;
      });

    const oneFullContainsTwo =
      interval1[0] <= interval2[0] && interval1[1] >= interval2[1];

    return oneFullContainsTwo ? 1 : 0;
  });

  console.log(result.reduce((a, b) => a + b, 0));
}

function part2() {
  const result = lines.map((line) => {
    const [interval1, interval2] = line
      .split(',')
      .map((interval) => interval.split('-').map(Number))
      .sort((a, b) => {
        const oneSize = a[1] - a[0];
        const twoSize = b[1] - b[0];
        return twoSize - oneSize;
      });

    const overlap =
      interval1[1] >= interval2[0] && interval2[1] >= interval1[0];

    return overlap ? 1 : 0;
  });
  console.log(result.reduce((a, b) => a + b, 0));
}

part1();
part2();
