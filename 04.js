const fs = require('fs');

const input = fs.readFileSync('04_input.txt')
                .toString()
                .split('\n')
                .filter((line) => line);

/**
 * Part I
********************************/

let validPasswords = input.filter((password) => {
  const words = [];
  const duplicatedWord = password.split(/ /g).find((word) => {
     if (words.includes(word)) return true;
     words.push(word);
     return false;
   });
   return !duplicatedWord;
});


console.log('First output', validPasswords.length);

/**
 * Part II
********************************/

validPasswords = input.filter((password) => {
  const words = [];
  const duplicatedWord = password.split(/ /g).find((word) => {
    const formattedWord = word.split('').sort().join('');
    if (words.includes(formattedWord)) return true;
    words.push(formattedWord);
    return false;
  });
  return !duplicatedWord;
});
console.log('Second output', validPasswords.length);
