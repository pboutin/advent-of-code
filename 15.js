const genAinput = 277;
const genAfactor = 16807;
const genBinput = 349;
const genBfactor = 48271;
const divider = 2147483647;

const compareLowerBits = (valueA, valueB, lowerBits) => {
  lowerBits *= -1;
  const bitsA = `0000000000000000${valueA.toString(2)}`.slice(lowerBits);
  const bitsB = `0000000000000000${valueB.toString(2)}`.slice(lowerBits);
  return bitsA === bitsB;
};

/**
 * Part I
 ********************************/

let matchesCount = 0;
let genAvalue = genAinput;
let genBvalue = genBinput;

for (let i = 0; i < 40000000; i++) {
  if (compareLowerBits(genAvalue, genBvalue, 16)) matchesCount++;
  genAvalue = (genAvalue * genAfactor) % divider;
  genBvalue = (genBvalue * genBfactor) % divider;
}

console.log('First output', matchesCount);

/**
 * Part II
 ********************************/

matchesCount = 0;
genAvalue = genAinput;
genBvalue = genBinput;

for (let i = 0; i < 5000000; i++) {
  do {
    genAvalue = (genAvalue * genAfactor) % divider;
  } while ((genAvalue % 4) > 0)

  do {
    genBvalue = (genBvalue * genBfactor) % divider;
  } while ((genBvalue % 8) > 0)

  if (compareLowerBits(genAvalue, genBvalue, 16)) matchesCount++;
}

console.log('Second output', matchesCount);
