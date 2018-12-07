const POINTS = [
  [174, 356],
  [350, 245],
  [149, 291],
  [243, 328],
  [312, 70],
  [327, 317],
  [46, 189],
  [56, 209],
  [84, 60],
  [308, 202],
  [289, 331],
  [201, 139],
  [354, 201],
  [283, 130],
  [173, 144],
  [110, 280],
  [242, 250],
  [196, 163],
  [217, 300],
  [346, 188],
  [329, 225],
  [112, 275],
  [180, 190],
  [255, 151],
  [107, 123],
  [86, 304],
  [236, 88],
  [313, 124],
  [297, 187],
  [203, 289],
  [104, 71],
  [100, 151],
  [227, 47],
  [318, 293],
  [268, 225],
  [116, 49],
  [222, 125],
  [261, 146],
  [47, 117],
  [119, 214],
  [183, 242],
  [136, 210],
  [91, 300],
  [326, 237],
  [144, 273],
  [300, 249],
  [200, 312],
  [305, 50],
  [235, 265],
  [322, 291],
];
const MIN_X = 0;
const MIN_Y = 0;
const MAX_X = 500;
const MAX_Y = 500;
const PADDING = 250;

const distanceBetween = ([x1, y1], [x2, y2]) => (Math.abs(x2 - x1) + Math.abs(y2 - y1));

const paddedZones = (new Array(POINTS.length)).fill(0);
const zones = (new Array(POINTS.length)).fill(0);

for (let x = MIN_X - PADDING; x <= MAX_X + PADDING; x++) {
  for (let y = MIN_Y - PADDING; y <= MAX_Y + PADDING; y++) {
    const {index} = POINTS.reduce((acc, point, index) => {
      const distance = distanceBetween(point, [x, y]);
      if (distance < acc.distance) return {index, distance};
      if (distance === acc.distance) return {index: null, distance};
      return acc;
    }, {index: null, distance: Infinity});

    if (!index) continue;

    if (x > MIN_X && x < MAX_X && y > MIN_Y && y < MAX_Y) paddedZones[index]++;
    zones[index]++;
  }
}

const commonZones = zones.filter((size) => paddedZones.indexOf(size) > -1);
console.log("Part I : ", Math.max(...commonZones));

const MAX_DISTANCE = 10000;
let areaSize = 0;

for (let x = MIN_X; x <= MAX_X; x++) {
  for (let y = MIN_Y; y <= MAX_Y; y++) {
    const totalDistance = POINTS.reduce((acc, point) => {
      return acc + distanceBetween(point, [x, y]);
    }, 0);

    if (totalDistance < MAX_DISTANCE) areaSize++;
  }
}

console.log("Part II : ", areaSize);
