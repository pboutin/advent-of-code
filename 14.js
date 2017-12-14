const input = 'wenycdww';

// Throwback of day 10
const knotHash = (string) => {
  const listSize = 256;

  lengths = [...string.split('').map((_, index) => string.charCodeAt(index)), 17, 31, 73, 47, 23];
  list = Array(listSize).fill().map((_, index) => index);

  let currentPosition = 0;
  let skip = 0;
  let rounds = 64;

  while (rounds > 0) {
    lengths.forEach((length) => {
      // Get the sub-array to reverse
      let tempIndex = currentPosition;
      let tempList = [];
      while (tempList.length < length) {
        tempList.push(list[tempIndex]);
        tempIndex = tempIndex === listSize - 1 ? 0 : tempIndex + 1;
      }

      tempList.reverse();

      // Replace the values in the original list
      tempIndex = currentPosition;
      while (tempList.length > 0) {
        list[tempIndex] = tempList.shift();
        tempIndex = tempIndex === listSize - 1 ? 0 : tempIndex + 1;
      }
      currentPosition += (length + skip++);
      while (currentPosition >= listSize) currentPosition -= listSize;
    });

    rounds--;
  }

  // Dense hashes
  let denseHashes = [];
  while (list.length > 0) {
    denseHashes.push(list.splice(0, 16).reduce((hash, value) => hash ^ value, 0));
  }

  // Hex hash
  return denseHashes.reduce((hash, value) => hash + `0${value.toString(16)}`.slice(-2) , '');
};

/**
 * Part I
 ********************************/
let truthyBits = 0;
let disk = [];

for (let i = 0; i < 128; i++) {
  let rowBinary = '';
  knotHash(`${input}-${i}`).split('').forEach((char) => {
    const rawBinary = parseInt(char, 16).toString(2);
    truthyBits += rawBinary.replace(/0/g, '').length;
    rowBinary += `000${rawBinary}`.slice(-4);
  });

  disk.push(rowBinary.split(''));
}

console.log('First output', truthyBits);

/**
 * Part II
 ********************************/

const clearDiskFrom = (x, y) => {
  disk[x][y] = '0';
  if (x < 127 && disk[x+1][y] === '1') clearDiskFrom(x+1, y);
  if (x > 0 && disk[x-1][y] === '1') clearDiskFrom(x-1, y);
  if (y < 127 && disk[x][y+1] === '1') clearDiskFrom(x, y+1);
  if (y > 0 && disk[x][y-1] === '1') clearDiskFrom(x, y-1);
};

let regionsCount = 0;

for (let i = 0; i < 128; i++) {
  for (let j = 0; j < 128; j++) {
    if (disk[i][j] === '1') {

      regionsCount++;
      clearDiskFrom(i,j);
    }
  }
}

console.log('Second output', regionsCount);
