// Well, those solutions are ugly but I didn't find any better way of doing them :(

const input = 325489;

/**
 * Part I
********************************/
let distanceX = 0;
let distanceY = 0;
let currentValue = 1;
let currentStep = 1;

const getAbsoluteSum = (x, y) => Math.abs(x) + Math.abs(y);

const getDistanceFor = (input) => {
  while (true) {
    // Go right
    for (let i = 0; i < currentStep; i++) {
      if (currentValue === input) return getAbsoluteSum(distanceX, distanceY);
      currentValue++;
      distanceX++;
    }

    // Go up
    for (let i = 0; i < currentStep; i++) {
      if (currentValue === input) return getAbsoluteSum(distanceX, distanceY);
      currentValue++;
      distanceY++;
    }

    // Go left
    for (let i = 0; i < currentStep + 1; i++) {
      if (currentValue === input) return getAbsoluteSum(distanceX, distanceY);
      currentValue++;
      distanceX--;
    }

    // Go down
    for (let i = 0; i < currentStep + 1; i++) {
      if (currentValue === input) return getAbsoluteSum(distanceX, distanceY);
      currentValue++;
      distanceY--;
    }

    currentStep += 2;
  }
};

console.log('First output', getDistanceFor(input));

/**
 * Part II
********************************/
const MAP_DIMENSION = 16;
let map = Array(MAP_DIMENSION).fill(0).map(() => Array(MAP_DIMENSION).fill(0));
let currentX = MAP_DIMENSION / 2;
let currentY = MAP_DIMENSION / 2;

map[currentX][currentY] = 1;
currentStep = 1;

const computeValue = (map, x, y) => {
  const value = map[x + 1][y] +
    map[x + 1][y + 1] +
    map[x][y + 1] +
    map[x - 1][y + 1] +
    map[x - 1][y] +
    map[x - 1][y - 1] +
    map[x][y - 1] +
    map[x + 1][y - 1];
  return value;
};

const getNextBiggerThan = (input) => {
  while (true) {
    // Go right
    for (let i = 0; i < currentStep; i++) {
      currentX++;
      map[currentX][currentY] = computeValue(map, currentX, currentY);
      if (map[currentX][currentY] > input) return map[currentX][currentY];
    }

    // Go up
    for (let i = 0; i < currentStep; i++) {
      currentY++;
      map[currentX][currentY] = computeValue(map, currentX, currentY);
      if (map[currentX][currentY] > input) return map[currentX][currentY];
    }

    // Go left
    for (let i = 0; i < currentStep + 1; i++) {
      currentX--;
      map[currentX][currentY] = computeValue(map, currentX, currentY);
      if (map[currentX][currentY] > input) return map[currentX][currentY];
    }

    // Go down
    for (let i = 0; i < currentStep + 1; i++) {
      currentY--;
      map[currentX][currentY] = computeValue(map, currentX, currentY);
      if (map[currentX][currentY] > input) return map[currentX][currentY];
    }

    currentStep += 2;
  }
};

console.log('Second output', getNextBiggerThan(input));
