import { readFileSync } from 'node:fs';

const lines = readFileSync('input.txt', { encoding: 'utf-8' }) // read day??.txt content
  .replace(/\r/g, '') // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split('\n\n'); // Split on newline

function part1() {
  //do something here
  const calories = lines.map((line) => {
    const elf = line.split('\n').map(Number);
    return elf.reduce((p, c) => p + c, 0);
  });
  console.log(Math.max(...calories));
}

function part2() {
  //do something here
  const calories = lines.map((line) => {
    const elf = line.split('\n').map(Number);
    return elf.reduce((p, c) => p + c, 0);
  });

  calories.sort((a, b) => b - a);

  console.log(calories.slice(0, 3).reduce((p, c) => p + c, 0));
}

part1();
part2();
