const fs = require('fs');

const input = fs.readFileSync('08_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line);

const instructions = input.map((instruction) => {
  const condition = instruction.match(/if \w+ (.+)/)[1];
  const conditionVar = instruction.match(/if (\w+) /)[1];
  const actionVar = instruction.match(/^\w+/)[0];
  const actionInstruction = instruction.match(/^\w+ (\w+) /)[1];
  const actionValue = parseInt(instruction.match(/^\w+ \w+ ([\-0-9]+)/)[1], 10);
  return {
    condition,
    conditionVar,
    actionVar,
    actionValue: actionInstruction === 'inc' ? actionValue : -1 * actionValue
  };
});

/**
 * Part I
 ********************************/

const getVariable = (register, variable) => register[variable] ? register[variable] : 0;
let maximum = 0;

const register = instructions.reduce((register, instruction) => {
  const conditionValue = getVariable(register, instruction.conditionVar);
  if (eval(`${conditionValue} ${instruction.condition}`)) {
    console.log(`${conditionValue} ${instruction.condition}`);
    if (!register[instruction.actionVar]) register[instruction.actionVar] = 0;
    register[instruction.actionVar] += instruction.actionValue;

    // Part II
    if (register[instruction.actionVar] > maximum) maximum = register[instruction.actionVar];
  }
  return register;
}, {});

console.log('First output', Math.max(...Object.values(register)));

/**
 * Part II
 ********************************/

console.log('Second output', maximum);
