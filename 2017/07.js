const fs = require('fs');

const input = fs.readFileSync('07_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line);

const nodes = input.reduce((map, line) => {
  const name = line.match(/\w+/)[0];
  const weight = parseInt(line.match(/\((\d+)\)/)[1], 10);
  const childrenString = line.match(/> (.+)$/);
  const children = childrenString ? childrenString[1].split(', ') : [];
  map[name] = {
    name,
    weight,
    children
  };
  return map;
}, {});

/**
 * Part I
********************************/

const programNames = Object.keys(nodes);
const rootProgramName = programNames.find((name) => {
  return !programNames.find((parentName) => nodes[parentName].children.includes(name));
});

console.log('First output', rootProgramName);

/**
 * Part II
********************************/

Object.values(nodes).forEach((node) => {
  node.children = node.children.map((name) => nodes[name]);
});

const getChildrenWeight = (node) => node.children.reduce((childrenWeight, childrenNode) => childrenWeight + getSubtreeWeight(childrenNode), 0);

const getSubtreeWeight = (node) => {
  if (node.children.length > 0) return node.weight + getChildrenWeight(node);
  return node.weight;
};

const getUnbalancedNodeDesiredWeight = (node, targetWeight) => {
  if (node.children.length === 0) return targetWeight;

  const childrenWeights = node.children.map((childNode) => getSubtreeWeight(childNode));
  const unbalancedChildrenWeight = childrenWeights.find((childrenWeight, i) => {
    return !childrenWeights.find((otherChildrenWeight, j) => childrenWeight === otherChildrenWeight && i !== j);
  });

  if (!unbalancedChildrenWeight) {
    return targetWeight - getChildrenWeight(node);
  }

  const unbalancedChildrenIndex = childrenWeights.indexOf(unbalancedChildrenWeight);
  const balancedChildrenWeight = unbalancedChildrenIndex === 0 ? childrenWeights[1] : childrenWeights[0];

  return getUnbalancedNodeDesiredWeight(node.children[unbalancedChildrenIndex], balancedChildrenWeight);
};

console.log('Second output', getUnbalancedNodeDesiredWeight(nodes[rootProgramName], 0));
