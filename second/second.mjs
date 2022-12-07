import { readFileSync } from 'node:fs';

const lines = readFileSync('input.txt', { encoding: 'utf-8' }) // read day??.txt content
  .replace(/\r/g, '') // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split('\n') // Split on newline
  .map((line) => line.split(' '));

const moves = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const mapping = {
  X: moves.rock,
  A: moves.rock,
  Y: moves.paper,
  B: moves.paper,
  Z: moves.scissors,
  C: moves.scissors,
};

function calcScore(myMove, opponentMove) {
  if (myMove === opponentMove) {
    return myMove + 3;
  }

  if (
    (myMove === moves.rock && opponentMove === moves.scissors) ||
    (myMove === moves.paper && opponentMove === moves.rock) ||
    (myMove === moves.scissors && opponentMove === moves.paper)
  ) {
    return myMove + 6;
  }

  return myMove;
}

function part1() {
  const results = lines.map((line) => {
    const myMove = mapping[line[0]];
    const opponentMove = mapping[line[1]];

    return calcScore(myMove, opponentMove);
  });

  console.log(results.reduce((a, b) => a + b, 0));
}

const solution = {
  A: {
    //rock
    X: moves.scissors, //lose
    Y: moves.rock, //draw
    Z: moves.paper, //win
  },
  B: {
    //paper
    X: moves.rock,
    Y: moves.paper,
    Z: moves.scissors,
  },
  C: {
    //scissors
    X: moves.paper,
    Y: moves.scissors,
    Z: moves.rock,
  },
};

function part2() {
  const outcomes = lines.map((line) => {
    const opponentMove = mapInput[line[0]];

    // Guess our move from the instructions
    const ourMove = solution[line[0]][line[1]];

    return score(opponentMove, ourMove);
  });
  console.log(outcomes.reduce((a, b) => a + b, 0));
}

part1();
part2();
