const fs = require('fs');
const input = fs.readFileSync('23_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line);

const commands = {
  'set': (registry, key, value) => {
    if (isNaN(value)) return registry[key] = registry[value];
    registry[key] = parseInt(value, 10);
  },
  'sub': (registry, key, value) => {
    if (isNaN(value)) return registry[key] -= registry[value];
    if (registry[key] === undefined) registry[key] = 0;
    registry[key] -= parseInt(value, 10);
  },
  'mul': (registry, key, value) => {
    if (isNaN(value)) return registry[key] *= registry[value];
    if (registry[key] === undefined) registry[key] = 0;
    registry[key] *= parseInt(value, 10);
  },
  'jnz': (registry, key, value) => {
    if (!isNaN(key)) return parseInt(value, 10);
    if (registry[key] === 0) return 1;
    return parseInt(value, 10);
  },
}

/**
 * Part I
********************************/

let registry = {a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0};
let instructionIndex = 0;
let mulCount = 0;

while (instructionIndex >= 0 && instructionIndex < input.length) {
  const [command, x, y] = input[instructionIndex].split(' ');

  if (!commands[command]) console.log(command);
  const returnedValue = commands[command](registry, x, y);

  if (command === 'mul') mulCount++;

  instructionIndex += (command === 'jnz' ? returnedValue : 1);
}

console.log('First output', mulCount);

/**
 * Part II
********************************/

registry = {a:1,b:0,c:0,d:0,e:0,f:0,g:0,h:0};
instructionIndex = 0;

while (instructionIndex >= 0 && instructionIndex < input.length) {
  const [command, x, y] = input[instructionIndex].split(' ');

  if (!commands[command]) console.log(command);
  const returnedValue = commands[command](registry, x, y);

  instructionIndex += (command === 'jnz' ? returnedValue : 1);
}

console.log('Second output', registry.h);
