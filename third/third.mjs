import { readFileSync } from 'node:fs';

const lines = readFileSync('input.txt', { encoding: 'utf-8' }) // read day??.txt content
  .replace(/\r/g, '') // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split('\n'); // Split on newline
// .map(Number); // Parse each line into a number

function calc_value(letter) {
  if (/[a-z]/.test(letter)) {
    return letter.charCodeAt(0) - 96;
  } else {
    return letter.charCodeAt(0) - 65 + 27;
  }
}

function part1() {
  //do something here
  const result = lines.map((line) => {
    const first = [...line.slice(0, Math.floor(line.length / 2))];
    const second = [...line.slice(Math.floor(line.length / 2))];

    const firstSet = new Set(first);
    const intersection = second.filter((value) => firstSet.has(value));
    const duplications = [...new Set(intersection)];

    return calc_value(duplications[0]);
  });
  console.log(result.reduce((a, b) => a + b, 0));
}

function part2() {
  //do something here
  let sum = 0;
  for (let i = 0; i < lines.length; i += 3) {
    const backpack = [[...lines[i]], [...lines[i + 1]], [...lines[i + 2]]];

    let set = new Set(backpack[0]);
    let intersection = backpack[1].filter((value) => set.has(value));

    set = new Set(intersection);
    intersection = backpack[2].filter((value) => set.has(value));

    const duplications = [...new Set(intersection)];
    sum += calc_value(duplications[0]);
  }

  console.log(sum);
}

part1();
part2();
