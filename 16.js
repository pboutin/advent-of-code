const fs = require('fs');

const input = fs.readFileSync('16_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line)[0];

const moves = input.split(',').map((move) => {
  const params = move.substring(1);
  switch(move[0]) {
    case 's': {
      return (programs) => {
        for (let i = 0; i < parseInt(params, 10); i++) programs.unshift(programs.pop());
        return programs;
      }
    } break;
    case 'x': {
      return (programs) => {
        let [i,j] = params.split('/');
        i = parseInt(i, 10);
        j = parseInt(j, 10);
        const tempProgram = programs[i];
        programs[i] = programs[j];
        programs[j] = tempProgram;
        return programs;
      }
    } break;
    case 'p': {
      return (programs) => {
        const [programA, programB] = params.split('/');
        const i = programs.indexOf(programA);
        const j = programs.indexOf(programB);
        const tempProgram = programs[i];
        programs[i] = programs[j];
        programs[j] = tempProgram;
        return programs;
      }
    } break;
  }
});

/**
 * Part I
 ********************************/

let orderedPrograms = moves.reduce((programs, moveFunc) => moveFunc(programs), 'abcdefghijklmnop'.split(''));

console.log('First output', orderedPrograms.join(''));

/**
 * Part II
 ********************************/

// Found out that after 60 cycle, the programs are back into their initial positions
// knowing that, we only have to computed the modulo of the crazy billion amount
const cycle = 60;

orderedPrograms = 'abcdefghijklmnop'.split('');
for (let i = 0; i < (1000000000 % cycle); i++) {
  orderedPrograms = moves.reduce((programs, moveFunc) => moveFunc(programs), orderedPrograms);
}

console.log('Second output', orderedPrograms.join(''));
