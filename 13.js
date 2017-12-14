const fs = require('fs');

const input = fs.readFileSync('13_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line);

const initFirewall = () => {
  return input.reduce((firewall, rawLayer) => {
    const [depth, range] = rawLayer.split(': ');
    const tempLayer = Array(parseInt(range, 10)).fill('');
    tempLayer[0] = 'S';
    firewall[parseInt(depth, 10)] = tempLayer;
    return firewall;
  }, {});
};

const firewallTick = () => {
  Object.keys(firewall).forEach((depth) => {
    const currentLayer = firewall[depth];
    const scannerPos = currentLayer.indexOf('S');
    currentLayer[scannerPos] = '';
    if (scannerPos === 0) firewallDirections[depth] = 1;
    if (scannerPos === currentLayer.length - 1) firewallDirections[depth] = -1;
    currentLayer[scannerPos + firewallDirections[depth]] = 'S';
  });
};

/**
 * Part I
 ********************************/

let firewallDirections = {};
let firewall = initFirewall();
let cost = 0;

for (let index = 0; index <= Math.max(...Object.keys(firewall)); index++) {
  if (firewall[index] && firewall[index][0] === 'S') cost += firewall[index].length * index;
  firewallTick();
}

console.log('First output', cost);

/**
 * Part II
 ********************************/

let delay = 0

const resetFirewall = (delay) => {
  Object.keys(firewall).forEach((depth) => {
    const currentLayer = firewall[depth];
    const layerLength = currentLayer.length - 1;
    let cyclePos = delay % (layerLength * 2);
    if (cyclePos > layerLength) {
      cyclePos = layerLength - (cyclePos - layerLength);
      firewallDirections[depth] = -1;
    } else {
      firewallDirections[depth] = 1;
    }
    currentLayer.fill('');
    currentLayer[cyclePos] = 'S';
  });
};

do {
  cost = 0;
  resetFirewall(delay);

  for (let index = 0; index <= Math.max(...Object.keys(firewall)); index++) {
    if (firewall[index] && firewall[index][0] === 'S') {
      cost = 1;
      delay++;
      break;
    }
    firewallTick();
  }
} while (cost > 0)

console.log('Second output', delay);
