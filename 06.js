const input = '5	1	10	0	1	7	13	14	3	12	8	10	7	12	0	6'
  .split(/\s+/g)
  .map(Number);

/**
 * Part I
 ********************************/

const redistribute = (map, indexToRedistribute) => {
  const getNextIndex = (index, map) => index + 1 === map.length ? 0 : index + 1;
  let toRedistribute = map[indexToRedistribute];
  map[indexToRedistribute] = 0;

  let index = getNextIndex(indexToRedistribute, map);
  while (toRedistribute) {
    if (index !== indexToRedistribute) {
      map[index]++;
      toRedistribute--;
    }
    index = getNextIndex(index, map);
  }
};

const history = [];
let stepsCount = 0;

while (!history.includes(input.join(','))) {
  history.push(input.join(','));
  redistribute(input, input.indexOf(Math.max(...input)));
  stepsCount++;
}

console.log('First output', stepsCount);

/**
 * Part II
 ********************************/

console.log('Second output', stepsCount - history.indexOf(input.join(',')));
