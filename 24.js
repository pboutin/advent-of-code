const fs = require('fs');

const input = fs.readFileSync('24_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line);

const components = input.map((line) => line.split('/').map(Number));

const bridges = [];
const buildBridges = (componentIndexes, requiredPort) => {
  let compatibleIndexes = [];
  components.forEach((component, componentIndex) => {
    if ((componentIndexes.indexOf(componentIndex) === -1) && (component.indexOf(requiredPort) > -1)) {
      compatibleIndexes.push(componentIndex);
    }
  });

  if (compatibleIndexes.length === 0) {
    bridges.push(componentIndexes);
    return;
  }

  compatibleIndexes.forEach((componentIndex) => {
    let componentIndexesCopy = componentIndexes.slice(0);
    componentIndexesCopy.push(componentIndex);
    let nextPort = components[componentIndex][0] === requiredPort ? components[componentIndex][1] : components[componentIndex][0];
    buildBridges(componentIndexesCopy, nextPort);
  });
};

buildBridges([], 0);

/**
 * Part I
********************************/

const bestBridgeScore = bridges.reduce((maxScore, bridge) => {
  const bridgeScore = bridge.reduce((bridgeScore, componentIndex) => bridgeScore + components[componentIndex][0] + components[componentIndex][1], 0);
  if (bridgeScore > maxScore) return bridgeScore;
  return maxScore;
}, 0);

console.log('First output', bestBridgeScore);

/**
 * Part II
********************************/

const maxLength = bridges.reduce((maxLength, bridge) => bridge.length > maxLength ? bridge.length : maxLength, 0);
const longestBridges = bridges.filter((bridge) => bridge.length === maxLength);

const bestLongestBridgeScore = longestBridges.reduce((maxScore, bridge) => {
  const bridgeScore = bridge.reduce((bridgeScore, componentIndex) => bridgeScore + components[componentIndex][0] + components[componentIndex][1], 0);
  if (bridgeScore > maxScore) return bridgeScore;
  return maxScore;
}, 0);

console.log('Second output', bestLongestBridgeScore);
