const fs = require('fs');

const input = fs.readFileSync('./07.input.txt')
  .toString()
  .split("\n")
  .filter(Boolean);

const nodes = input.reduce((nodesMap, line) => {
  const [_, parentId, id] = line.match(/Step (\w+) .+ step (\w+)/);

  if (!nodesMap[id]) nodesMap[id] = {id, deps: []};
  if (!nodesMap[parentId]) nodesMap[parentId] = {id: parentId, deps: []};

  nodesMap[id].deps.push(parentId);

  return nodesMap;
}, {});

Object.values(nodes).forEach((node) => {
  node.deps = node.deps.map((id) => nodes[id]);
});

let output = '';

while (true) {
  const nextNode = Object.values(nodes)
    .filter(({deps, id}) => deps.length === 0 && output.indexOf(id) === -1)
    .reduce((minNode, node) => {
      if (!minNode) return node;
      return node.id < minNode.id ? node : minNode;
    }, null);

  if (!nextNode) break;

  output += nextNode.id;

  Object.values(nodes).forEach((node) => node.deps = node.deps.filter(({id}) => id !== nextNode.id))
}

console.log('Part I : ', output);
