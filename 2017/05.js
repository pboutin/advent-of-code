const fs = require('fs');

const input = fs.readFileSync('05_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line)
                .map(Number);

/**
 * Part I
********************************/

let currentIndex = 0;
let stepsCount = 0;
const partOneInput = input.slice(0);

while (currentIndex >= 0 && currentIndex < partOneInput.length) {
  stepsCount++;
  const oldIndex = currentIndex;
  currentIndex += partOneInput[currentIndex];
  partOneInput[oldIndex]++;
}


console.log('First output', stepsCount);

/**
 * Part II
********************************/

currentIndex = 0;
stepsCount = 0;
const partTwoInput = input.slice(0);

while (currentIndex >= 0 && currentIndex < partTwoInput.length) {
  stepsCount++;
  const oldIndex = currentIndex;
  currentIndex += partTwoInput[currentIndex];
  partTwoInput[oldIndex] += partTwoInput[oldIndex] >= 3 ? -1 : 1;
}


console.log('Second output', stepsCount);
