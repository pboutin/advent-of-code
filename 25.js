// The input is not computed from the file directly

const steps = 12586542;
const script = {
  A: [
    {
      value: 1,
      offset: 1,
      nextState: 'B'
    },
    {
      value: 0,
      offset: -1,
      nextState: 'B'
    }
  ],
  B: [
    {
      value: 0,
      offset: 1,
      nextState: 'C'
    },
    {
      value: 1,
      offset: -1,
      nextState: 'B'
    }
  ],
  C: [
    {
      value: 1,
      offset: 1,
      nextState: 'D'
    },
    {
      value: 0,
      offset: -1,
      nextState: 'A'
    }
  ],
  D: [
    {
      value: 1,
      offset: -1,
      nextState: 'E'
    },
    {
      value: 1,
      offset: -1,
      nextState: 'F'
    }
  ],
  E: [
    {
      value: 1,
      offset: -1,
      nextState: 'A'
    },
    {
      value: 0,
      offset: -1,
      nextState: 'D'
    }
  ],
  F: [
    {
      value: 1,
      offset: 1,
      nextState: 'A'
    },
    {
      value: 1,
      offset: -1,
      nextState: 'E'
    }
  ]
};

/**
 * Part I
********************************/

let currentState = 'A';
let currentPosition = 0;
let register = {};

for (let i = 0; i < steps; i++) {
  if (register[currentPosition] === undefined) register[currentPosition] = 0;
  let operation = script[currentState][register[currentPosition]];
  register[currentPosition] = operation.value;
  currentPosition += operation.offset;
  currentState = operation.nextState
}

console.log('First output', Object.values(register).filter((value) => value === 1).length);

/**
 * Part II
********************************/


console.log('Second output', '');
