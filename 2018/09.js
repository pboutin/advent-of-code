const startedAt = Date.now();

// 462 players; last marble is worth 71938 points
const PLAYERS = 462;
const TOP_MARBLE = 71938;

const scores = Array(PLAYERS).fill(0);
let currentPlayer = 0;

let currentMarble = {value: 0};
currentMarble.next = currentMarble;
currentMarble.prev = currentMarble;

for (let marble = 1; marble <= TOP_MARBLE * 100; marble++) {
  if (marble === TOP_MARBLE) console.log('Part I : ', Math.max(...scores));

  if (marble % 23 === 0 && marble > 0) {
    scores[currentPlayer] += marble;

    const marbleToRemove = currentMarble.prev.prev.prev.prev.prev.prev.prev;

    scores[currentPlayer] += marbleToRemove.value;

    marbleToRemove.prev.next = marbleToRemove.next;
    marbleToRemove.next.prev = marbleToRemove.prev;

    currentMarble = marbleToRemove.next;
  } else {
    const insertAfterMarble = currentMarble.next;

    const newMarble = {
      value: marble,
      next: insertAfterMarble.next,
      prev: insertAfterMarble
    };

    insertAfterMarble.next.prev = newMarble;
    insertAfterMarble.next = newMarble;

    currentMarble = newMarble;
  }

  currentPlayer += 1;
  if (currentPlayer === PLAYERS) currentPlayer = 0;
}

console.log('Part II : ', Math.max(...scores));
console.log('Completed in ', Date.now() - startedAt, ' ms')
