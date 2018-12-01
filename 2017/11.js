const fs = require('fs');

const input = fs.readFileSync('11_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line)[0];

const simplify = (rawDirections) => {
  const initialRawDirections = rawDirections;

  // Ensure the string is padded
  if (rawDirections[0] !== ',') rawDirections = `,${rawDirections},`;

  // Opposites
  rawDirections = rawDirections.replace(/n,(.+)s,/, ',$1,');
  rawDirections = rawDirections.replace(/s,(.+)n,/, ',$1,');
  rawDirections = rawDirections.replace(/sw(.+)ne/, ',$1,');
  rawDirections = rawDirections.replace(/ne(.+)sw/, ',$1,');
  rawDirections = rawDirections.replace(/se(.+)nw/, ',$1,');
  rawDirections = rawDirections.replace(/nw(.+)se/, ',$1,');

  // Resirections
  rawDirections = rawDirections.replace(/nw(.+)ne/, ',n,$1,');
  rawDirections = rawDirections.replace(/ne(.+)nw/, ',n,$1,');
  rawDirections = rawDirections.replace(/n,(.+)se/, ',ne,$1,');
  rawDirections = rawDirections.replace(/se(.+)n,/, ',ne,$1,');
  rawDirections = rawDirections.replace(/ne(.+)s,/, ',se,$1,');
  rawDirections = rawDirections.replace(/s,(.+)ne/, ',se,$1,');
  rawDirections = rawDirections.replace(/se(.+)sw/, ',s,$1,');
  rawDirections = rawDirections.replace(/sw(.+)se/, ',s,$1,');
  rawDirections = rawDirections.replace(/s,(.+)nw/, ',sw,$1,');
  rawDirections = rawDirections.replace(/nw(.+)s,/, ',sw,$1,');
  rawDirections = rawDirections.replace(/n,(.+)sw/, ',nw,$1,');
  rawDirections = rawDirections.replace(/sw(.+)n,/, ',nw,$1,');

  if (initialRawDirections !== rawDirections) return simplify(rawDirections);
  return rawDirections.split(/,+/).filter((s) => s);
};

/**
 * Part I
********************************/

console.log('First output', simplify(input).length);

/**
 * Part II
********************************/

const steps = input.split(',');
let currentPath = '';

let maxSteps = steps.reduce((maxSteps, currentStep) => {
  currentPath += `,${currentStep}`;

  const optimizedSteps = simplify(currentPath);
  currentPath = optimizedSteps.join(',');

  if (optimizedSteps.length > maxSteps) return optimizedSteps.length;
  return maxSteps;
}, 0);

console.log('Second output', maxSteps);
