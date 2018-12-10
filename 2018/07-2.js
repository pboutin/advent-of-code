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
let clock = 0;
const workers = Array(5).fill(null).map(() => ({cooldown: 0, node: null}));

while (true) {
  workers.forEach((worker) => {
    if (worker.cooldown > 0) worker.cooldown--;

    if (worker.cooldown === 0 && worker.node) {
      output += worker.node.id;
      Object.values(nodes).forEach((node) => node.deps = node.deps.filter(({id}) => id !== worker.node.id))
      worker.node = null;
    }
  });

  while (true) {
    const nextNode = Object.values(nodes)
      .filter(({deps, id}) => {
        if (deps.length > 0) return false;
        if (output.indexOf(id) > -1) return false;
        if (workers.find(({node}) => node && node.id == id)) return false;
        return true;
      })
      .reduce((minNode, node) => {
        if (!minNode) return node;
        return node.id < minNode.id ? node : minNode;
      }, null);

    const availableWorkerIndex = workers.findIndex(({node}) => !node);

    if (availableWorkerIndex === -1 || !nextNode) break;

    workers[availableWorkerIndex].cooldown = nextNode.id.charCodeAt(0) - 4;
    workers[availableWorkerIndex].node = nextNode;
  }

  if (workers.every(({node}) => !node)) break;

  clock++;
}

console.log('Part II : ', clock);
