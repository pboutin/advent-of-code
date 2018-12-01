const input = 343;

/**
 * Part I
********************************/

let list = [0];
let currentPosition = 0;

for (let value = 1; value <= 2017; value++) {
  const step = input % list.length;

  currentPosition += step;

  if (currentPosition > (list.length - 1)) currentPosition -= list.length;

  list.splice(currentPosition + 1, 0, value);

  currentPosition++;
}

console.log('First output', list[currentPosition + 1]);

/**
 * Part II
********************************/

currentPosition = 0;
let length = 1;
let nextToZero = null;

for (let value = 1; value <= 50000000; value++) {
  const step = input % length;

  currentPosition += step;

  if (currentPosition > (length - 1)) currentPosition -= length;

  if (currentPosition === 0) nextToZero = value;

  length++;
  currentPosition++;
}

console.log('Second output', nextToZero);
