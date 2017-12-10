const listSize = 256;
const input = '189,1,111,246,254,2,0,120,215,93,255,50,84,15,94,62';

const knotHash = (list, lengths, rounds) => {
  let currentPosition = 0;
  let skip = 0;

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

  return list;
};

/**
 * Part I
 ********************************/

let lengths = input.split(',').map(Number);
let list = Array(listSize).fill().map((_, index) => index);

list = knotHash(list, lengths, 1);

console.log('First output', list[0] * list[1]);

/**
 * Part II
 ********************************/

lengths = [...input.split('').map((_, index) => input.charCodeAt(index)), 17, 31, 73, 47, 23];
list = Array(listSize).fill().map((_, index) => index);

list = knotHash(list, lengths, 64);

// Dense hashes
let denseHashes = [];
while (list.length > 0) {
  denseHashes.push(list.splice(0, 16).reduce((hash, value) => hash ^ value, 0));
}

// Hex hash
let hexHash = denseHashes.reduce((hash, value) => hash + `0${value.toString(16)}`.slice(-2) , '');

console.log('Second output', hexHash);
