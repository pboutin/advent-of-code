const fs = require('fs');

const input = fs.readFileSync('09_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line)[0];

/**
 * Part I
 ********************************/

let isGarbage = false;
let isSkipping = false;
let currentScore = 0;
let garbageCount = 0;

const score = input.split('').reduce((score, char) => {
  if (isSkipping) {
    isSkipping = false;
    return score;
  };

  switch(char) {
    case '<':
      if (isGarbage) {
        garbageCount++;
      } else {
        isGarbage = true;
      }
      break;
    case '>':
      isGarbage = false;
      break;
    case '!':
      isSkipping = true;
      break;
    case '{':
      if (isGarbage) {
        garbageCount++;
      } else {
        currentScore++;
      }
      break;
    case '}':
      if (isGarbage) {
        garbageCount++;
      } else {
        score += currentScore;
        currentScore--;
      }
      break;
    default:
      if (isGarbage) garbageCount++;
  }
  return score;
}, 0);

console.log('First output', score);

/**
 * Part II
 ********************************/

console.log('Second output', garbageCount);
