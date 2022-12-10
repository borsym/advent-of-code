import { readFileSync } from 'node:fs';

const lines = readFileSync('input.txt', { encoding: 'utf-8' }) // read day??.txt content
  .replace(/\r/g, '') // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split('\n') // Split on newline
  .map((line) => line.split(' ')) // convert second elements to number
  .map((line) => [line[0], parseInt(line[1])]); // Parse each line into a number
// .map(Number); // Parse each line into a number

const movesDefinition = {
  R: {
    x: 1,
    y: 0,
  },
  L: {
    x: -1,
    y: 0,
  },
  U: {
    x: 0,
    y: -1,
  },
  D: {
    x: 0,
    y: 1,
  },
};

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(direction) {
    this.x += direction.x;
    this.y += direction.y;
  }

  print() {
    console.log(`x: ${this.x}, y: ${this.y}`);
  }

  follow(point) {
    const distance = Math.max(
      Math.abs(this.x - point.x),
      Math.abs(this.y - point.y)
    );

    if (distance > 1) {
      const directions = {
        x: point.x - this.x,
        y: point.y - this.y,
      };

      this.x += Math.abs(directions.x) === 2 ? directions.x / 2 : directions.x;
      this.y += Math.abs(directions.y) === 2 ? directions.y / 2 : directions.y;
    }
  }
}

function markVisited(x, y) {
  return `${x}-${y}`;
}

function part1() {
  let visited = new Set();
  visited.add(markVisited(0, 0));
  let tail = new Point(0, 0);
  let head = new Point(0, 0);

  for (const line of lines) {
    let [direction, value] = line;
    let move = movesDefinition[direction];
    for (let i = 0; i < value; i++) {
      head.move(move);
      tail.follow(head);
      visited.add(markVisited(tail.x, tail.y));
    }
  }

  console.log(visited.size);
}

function part2() {
  const knots = new Array(10).fill(0).map((_) => new Point(0, 0));
  const visited = new Set();
  visited.add(markVisited(0, 0));

  for (const line of lines) {
    let [direction, value] = line;
    for (let i = 0; i < value; i++) {
      // Move the head according to the instructions
      knots[0].move(movesDefinition[direction]);
      // Move the rest of the rope
      for (let knot = 1; knot < knots.length; knot++) {
        const point = knots[knot];
        point.follow(knots[knot - 1]);
      }
      const tail = knots[knots.length - 1];
      visited.add(markVisited(tail.x, tail.y));
    }
  }

  console.log(visited.size);
}

part1();
part2();

/*
get the i,j of the current element
always move only the i,j element and save the [i,j] in a map with a value of 1 and increase when the same element is found
only move the i,j element grid is not required.

Head steps first after the tail checks if the tail need to move
I have to only count the what the TAIL visited
*/
