const fs = require('fs');

const input = fs.readFileSync('21_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line);

const patterns = input.map((line) => {
  const [match, result] = line.split(' => ');
  return {
    match: match.split('/'),
    result: result.split('/')
  };
});

const compare = (gridA, gridB) => gridA.every((line, index) => line === gridB[index]);

const reverseRows = (grid) => grid.map((line) => line.split('').reverse().join(''));

const reverseColumns = (grid) => grid.reduce((newGrid, line) => {
  newGrid.unshift(line);
  return newGrid
}, []);

const rotate = (grid) => {
  grid = grid.map((line) => line.split(''));
  // Transpose
  grid = grid[0].map((x, i) => grid.map(x => x[i]))
  grid = grid.map((line) => line.join(''));
  return reverseRows(grid);
}

const findReplacementFor = (subgrid) => {
  let length = subgrid[0].length;

  const pattern = patterns.find((pattern) => {
    if (pattern.match[0].length !== length) return false;

    if (compare(subgrid, pattern.match)) return true;
    subgrid = rotate(subgrid);
    if (compare(subgrid, pattern.match)) return true;
    subgrid = rotate(subgrid);
    if (compare(subgrid, pattern.match)) return true;
    subgrid = rotate(subgrid);
    if (compare(subgrid, pattern.match)) return true;
    subgrid = rotate(subgrid);

    subgrid = reverseRows(subgrid);
    if (compare(subgrid, pattern.match)) return true;
    subgrid = rotate(subgrid);
    if (compare(subgrid, pattern.match)) return true;
    subgrid = rotate(subgrid);
    if (compare(subgrid, pattern.match)) return true;
    subgrid = rotate(subgrid);
    if (compare(subgrid, pattern.match)) return true;
    subgrid = rotate(subgrid);
    subgrid = reverseRows(subgrid);

    return false;
  });
  return pattern.result;
};

let grid = ['.#.','..#','###'];
let afterFive;
let afterEighteen;

for (let i = 0; i < 18; i++) {
  console.log('Running iteration : ', i);

  let length = grid[0].length;
  let step = (length % 2) === 0 ? 2 : 3;
  let newSections = [];

  for (let y = 0; y < length; y += step) {
    for (let x = 0; x < length; x += step) {
      // Upper corner of each sub-sections
      let subSection = [];
      for (let subY = y; subY < y + step; subY++) {
        subSection.push(grid[subY].substr(x, step));
      }
      newSections.push(findReplacementFor(subSection));
    }
  }

  let newLength = Math.sqrt(newSections.length) * newSections[0].length;

  if (newLength === 1) {
    grid = newSections[0];
    continue;
  }

  grid = Array(newLength).fill('');
  let currentRow = 0;
  let currentSectionRow = 0;
  let offset = 0;
  newSections.forEach((section, sectionIndex) => {
    section.forEach((sectionLine, sectionLineIndex) => {
      grid[currentRow + offset] += sectionLine;
      currentRow++;
      if (currentRow === newSections[0].length) {
        currentRow = 0;
      }
    });

    if (((sectionIndex + 1) % Math.sqrt(newSections.length)) === 0) {
      offset += newSections[0].length
    }
  });

  if (i === 4) afterFive = grid.join('').replace(/\./g, '').length;
  if (i === 17) afterEighteen = grid.join('').replace(/\./g, '').length;
}

/**
 * Part I
********************************/

console.log('First output', afterFive);

/**
 * Part II
********************************/

console.log('Second output', afterEighteen);
