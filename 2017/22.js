const fs = require('fs');

const input = fs.readFileSync('22_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line);

const rotateDirection = (direction, angle) => {
  angle = angle * Math.PI / 180;
  const newX = Math.round((Math.cos(angle) * direction[0]) - (Math.sin(angle) * direction[1]));
  const newY = Math.round((Math.sin(angle) * direction[0]) + (Math.cos(angle) * direction[1]));
  return [newX, newY];
}

/**
 * Part I
********************************/

let grid = input.reduce((grid, line, y) => {
  grid[y] = {};
  line.split('').forEach((cell, x) => {
    grid[y][x] = cell === '#';
  });
  return grid;
}, {});

let position = [12, 12];
let direction = [0, -1];
let infectedBursts = 0;

for (let burst = 0; burst < 10000; burst++) {
  let [xPos, yPos] = position;

  // Ensure a value
  if (!grid[yPos]) grid[yPos] = {};
  if (grid[yPos][xPos] === undefined) grid[yPos][xPos] = false;

  // Grab the state
  let isInfected = grid[yPos][xPos];

  // Turns
  direction = rotateDirection(direction, isInfected ? 90 : -90);

  // Toggle the cell
  if (!isInfected) infectedBursts++;
  grid[yPos][xPos] = !isInfected;

  // Movin'
  position = [xPos + direction[0], yPos + direction[1]];
}

console.log('First output', infectedBursts);

/**
 * Part II
********************************/

const nextState = {
  c: 'w',
  w: 'i',
  i: 'f',
  f: 'c'
};

grid = input.reduce((grid, line, y) => {
  grid[y] = {};
  line.split('').forEach((cell, x) => {
    grid[y][x] = cell === '#' ? 'i' : 'c';
  });
  return grid;
}, {});

position = [12, 12];
direction = [0, -1];
infectedBursts = 0;

for (let burst = 0; burst < 10000000; burst++) {
  let [xPos, yPos] = position;

  // Ensure a value
  if (!grid[yPos]) grid[yPos] = {};
  if (grid[yPos][xPos] === undefined) grid[yPos][xPos] = 'c';

  // Grab the state
  let state = grid[yPos][xPos];

  // Turns
  switch (state) {
    case 'c':
      direction = rotateDirection(direction, -90);
      break;
    case 'i':
      direction = rotateDirection(direction, 90);
      break;
    case 'f':
      direction = rotateDirection(direction, 180);
  }


  // Toggle the cell
  if (nextState[state] === 'i') infectedBursts++;
  grid[yPos][xPos] = nextState[state];

  // Movin'
  position = [xPos + direction[0], yPos + direction[1]];
}

console.log('Second output', infectedBursts);
