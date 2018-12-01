const fs = require('fs');
const input = fs.readFileSync('18_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line);

const commands = {
  'snd': (registry, key) => {
    registry['_sound'] = registry[key];
  },
  'set': (registry, key, value) => {
    if (isNaN(value)) return registry[key] = registry[value];
    registry[key] = parseInt(value, 10);
  },
  'add': (registry, key, value) => {
    if (isNaN(value)) return registry[key] += registry[value];
    if (registry[key] === undefined) registry[key] = 0;
    registry[key] += parseInt(value, 10);
  },
  'mul': (registry, key, value) => {
    if (isNaN(value)) return registry[key] *= registry[value];
    if (registry[key] === undefined) registry[key] = 0;
    registry[key] *= parseInt(value, 10);
  },
  'mod': (registry, key, value) => {
    if (isNaN(value)) return registry[key] %= registry[value];
    if (registry[key] === undefined) registry[key] = 0;
    registry[key] %= parseInt(value, 10);
  },
  'rcv': (registry, key) => {
    if (registry[key] !== 0) return registry['_sound'];
  },
  'jgz': (registry, key, value) => {
    if (registry[key] <= 0) return 1;
    return isNaN(value) ? registry[value] : parseInt(value, 10);
  },
}

/**
 * Part I
********************************/

const registry = {_sound: null};
let instructionIndex = 0;
let recoveredFrequency = null;

while (instructionIndex >= 0 && instructionIndex < input.length) {
  const [command, x, y] = input[instructionIndex].split(' ');
  const returnedValue = commands[command](registry, x, y);

  if (command === 'rcv' && returnedValue !== 0) {
    recoveredFrequency = returnedValue;
    break;
  }

  instructionIndex += command === 'jgz' ? returnedValue : 1;
}

console.log('First output', recoveredFrequency);

/**
 * Part II
********************************/

const registryA = {_name: 'A', _queue: [], p: 0};
const registryB = {_name: 'B', _queue: [], p: 1};

commands['snd'] = (registry, key) => {
  const target = registry._name === 'A' ? registryB : registryA;
  target._queue.push(registry[key]);
};

commands['rcv'] = (registry, key) => {
  if (registry._queue.length === 0) return 0;
  registry[key] = registry._queue.shift();
  return 1;
}

let instructionIndexA = 0;
let instructionIndexB = 0;
let sentByB = 0;

while (instructionIndexA >= 0 && instructionIndexA < input.length
    && instructionIndexB >= 0 && instructionIndexB < input.length) {

  const [commandA, xA, yA] = input[instructionIndexA].split(' ');
  const [commandB, xB, yB] = input[instructionIndexB].split(' ');

  const returnedValueA = commands[commandA](registryA, xA, yA);
  const returnedValueB = commands[commandB](registryB, xB, yB);

  instructionIndexA += /(jgz|rcv)/.test(commandA) ? returnedValueA : 1;
  instructionIndexB += /(jgz|rcv)/.test(commandB) ? returnedValueB : 1;

  // Solution
  if (commandB === 'snd') sentByB++;

  // Deadlock detection
  if (commandA === 'rcv' && commandB === 'rcv' && returnedValueA === 0 && returnedValueB === 0) break;
}

console.log('Second output', sentByB);
