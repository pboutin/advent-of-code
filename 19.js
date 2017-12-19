const fs = require('fs');
const input = fs.readFileSync('19_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line);

/**
 * Part I
********************************/

const position = {
  x: input[0].indexOf('|'),
  y: 0
};

const direction = {
  x: 0,
  y: 1
};

let message = '';
let stepsCount = 1;

while (true) {
  // Move
  position.x += direction.x;
  position.y += direction.y;

  // Check for actions
  const currentChar = input[position.y][position.x];
  if (/[A-Z]/.test(currentChar)) message += currentChar;

  // Turn
  if (currentChar === '+') {
    if (direction.x !== 0) {
      direction.x = 0;
      direction.y = input[position.y - 1][position.x] === '|' ? -1 : 1;
    } else {
      direction.y = 0;
      direction.x = input[position.y][position.x - 1] === '-' ? -1 : 1;
    }
  }

  // Finish
  if (currentChar === ' ') break;

  // Part II
  stepsCount++;
}

console.log('First output', message);

/**
 * Part II
********************************/

console.log('Second output', stepsCount);
