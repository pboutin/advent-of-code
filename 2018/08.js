const fs = require('fs');

const input = fs.readFileSync('./08.input.txt')
  .toString()
  .split("\n")
  .filter(Boolean)
  .pop()
  .split(' ')
  .map((value) => parseInt(value, 10));

let metaSum = 0;

const processNode = () => {
  let nodeValue = 0;

  const childNodesCount = input.shift();
  const metaCount = input.shift();

  if (childNodesCount === 0) {
    for (let i = 0; i < metaCount; i++) nodeValue += input.shift();
    metaSum += nodeValue;
    return nodeValue;
  }

  const nodeValues = [];
  for (let i = 0; i < childNodesCount; i++) {
    nodeValues.push(processNode());
  };

  for (let i = 0; i < metaCount; i++) {
    const metaValue = input.shift();

    metaSum += metaValue;

    if (metaValue > 0 && metaValue <= childNodesCount) {
      nodeValue += nodeValues[metaValue - 1];
    }
  }

  return nodeValue;
}

const rootValue = processNode(input);

console.log('Part I : ', metaSum);
console.log('Part II : ', rootValue);
