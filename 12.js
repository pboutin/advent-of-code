const fs = require('fs');

const input = fs.readFileSync('12_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line);

const nodes = input.reduce((nodes, line) => {
  const program = line.match(/^\d+/)[0];
  const children = line.match(/> (.+)/)[1].split(', ');
  nodes[program] = {
    program,
    children
  };
  return nodes;
}, {});

Object.keys(nodes).forEach((program) => {
  nodes[program].children = nodes[program].children.map((program) => nodes[program]);
});

let history = [];
const navigate = (node) => {
  node.children.forEach((childNode) => {
    if (!history.includes(childNode.program)) {
      history.push(childNode.program);
      navigate(childNode, history);
    }
  });
};

/**
 * Part I
 ********************************/

history = ['0'];
navigate(nodes['0']);

console.log('First output', history.length);

/**
 * Part II
 ********************************/

let groupCount = 0;

while (Object.keys(nodes).length > 0) {
  const firstProgram = Object.keys(nodes)[0];

  // Navigate the related group
  history = [firstProgram];
  navigate(nodes[firstProgram]);

  // Remove the group related nodes
  history.forEach((program) => delete nodes[program]);

  groupCount++;
}

console.log('Second output', groupCount);
