import { readFileSync } from 'node:fs';

const lines = readFileSync('input.txt', { encoding: 'utf-8' }) // read day??.txt content
  .replace(/\r/g, '') // remove all \r characters to avoid issues on Windows
  .trim() // Remove starting/ending whitespace
  .split('\n\n')
  .map((line) => line.split('\n')); // Split on newline
// .map(Number); // Parse each line into a number

class Monkey {
  constructor(id, items, operations, divisor, throwIfTrue, thowIfFalse) {
    // Ugly ass hell
    let newCalculation = operations.split('=')[1].trim();
    this.id = parseInt(id.split(' ')[1][0]);
    this.items = items
      .split(':')[1]
      .trim()
      .split(',')
      .map((e) => parseInt(e));
    this.operation = operations.split('old')[1].trim()[0];
    this.number = !isNaN(newCalculation.split(this.operation)[1].trim())
      ? parseInt(newCalculation.split(this.operation)[1].trim())
      : newCalculation.split(this.operation)[1].trim();
    this.divisor = parseInt(divisor.split('by')[1].trim());
    this.throwIfTrue = parseInt(throwIfTrue.split('monkey')[1].trim());
    this.thowIfFalse = parseInt(thowIfFalse.split('monkey')[1].trim());
    this.inspectedCount = 0;
  }

  print() {
    console.log(
      `Monkey ${this.id} has ${this.items} and ${this.operation} ${this.number} and ${this.divisor} ${this.throwIfTrue} and ${this.thowIfFalse}`
    );
  }
}

function monkeyGotBored(number, divide) {
  return Math.floor(number / divide);
}

function calcWorryLevel(worryLevel, number, operation, divide) {
  if (number === 'old') number = worryLevel;
  switch (operation) {
    case '+':
      return monkeyGotBored(number + worryLevel, divide);
    case '-':
      return monkeyGotBored(number - worryLevel, divide);
    case '*':
      return monkeyGotBored(number * worryLevel, divide);
    case '/':
      return monkeyGotBored(number / worryLevel, divide);
  }
}

function part1() {
  const monkeys = [];
  for (let i = 0; i < lines.length; i++) {
    monkeys.push(
      new Monkey(
        lines[i][0],
        lines[i][1],
        lines[i][2],
        lines[i][3],
        lines[i][4],
        lines[i][5]
      )
    );
  }

  // divide by 3 after investigetion math.floor
  //stack, % worry level
  // two most active monkeys
  // Count the total number of times each monkey inspects items over 20 rounds:
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < monkeys.length; j++) {
      let monkey = monkeys[j];
      const length = monkey.items.length;
      monkey.inspectedCount += length;
      for (let k = 0; k < length; k++) {
        let item = monkey.items.shift();
        let calculation = calcWorryLevel(
          item,
          monkey.number,
          monkey.operation,
          3
        );
        const isDividable = calculation % monkey.divisor === 0;
        monkeys[
          isDividable ? monkey.throwIfTrue : monkey.thowIfFalse
        ].items.push(calculation);
      }
    }
  }
  const inspected = monkeys
    .map((monkey) => monkey.inspectedCount)
    .sort((a, b) => b - a);
  console.log(inspected[0] * inspected[1]);
}

function monkeyGotBored2(number, divide) {
  // in part two its %
  return Math.floor(number % divide);
}

function calcWorryLevel2(worryLevel, number, operation, divide) {
  if (number === 'old') number = worryLevel;
  switch (operation) {
    case '+':
      return monkeyGotBored2(number + worryLevel, divide);
    case '-':
      return monkeyGotBored2(number - worryLevel, divide);
    case '*':
      return monkeyGotBored2(number * worryLevel, divide);
    case '/':
      return monkeyGotBored2(number / worryLevel, divide);
  }
}

function moveElementsAfterCalc(length, monkey, divide, monkeys) {
  for (let k = 0; k < length; k++) {
    let item = monkey.items.shift();
    let calculation = calcWorryLevel2(
      item,
      monkey.number,
      monkey.operation,
      divide
    );

    const isDividable = calculation % monkey.divisor === 0;
    monkeys[isDividable ? monkey.throwIfTrue : monkey.thowIfFalse].items.push(
      calculation
    );
  }
}

function part2() {
  const monkeys = [];
  for (let i = 0; i < lines.length; i++) {
    monkeys.push(
      new Monkey(
        lines[i][0],
        lines[i][1],
        lines[i][2],
        lines[i][3],
        lines[i][4],
        lines[i][5]
      )
    );
  }

  // every divisior is prime multiply them...
  const divide = monkeys
    .map((monkey) => monkey.divisor)
    .reduce((a, b) => a * b);

  for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < monkeys.length; j++) {
      let monkey = monkeys[j];
      const length = monkey.items.length;
      monkey.inspectedCount += length;
      moveElementsAfterCalc(length, monkey, divide, monkeys);
    }
  }
  const inspected = monkeys
    .map((monkey) => monkey.inspectedCount)
    .sort((a, b) => b - a);
  console.log(inspected[0] * inspected[1]);
}

part1();
part2();
