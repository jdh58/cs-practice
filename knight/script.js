const availableMoves = {};

class Node {
  constructor(value = null, prev = null) {
    this.value = value;
    this.prev = prev;
  }
}

/* Steps that makes a graph object that represents each knight move
from each square */
const populateMoves = () => {
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      if (availableMoves[`[${i},${j}]`] === undefined) {
        availableMoves[`[${i},${j}]`] = [];
      }
      if (i + 1 <= 8 && j + 2 <= 8 && i + 1 > 0 && j + 2 > 0) {
        availableMoves[`[${i},${j}]`].push([i + 1, j + 2]);
      }
      if (i - 1 <= 8 && j + 2 <= 8 && i - 1 > 0 && j + 2 > 0) {
        availableMoves[`[${i},${j}]`].push([i - 1, j + 2]);
      }
      if (i + 1 <= 8 && j - 2 <= 8 && i + 1 > 0 && j - 2 > 0) {
        availableMoves[`[${i},${j}]`].push([i + 1, j - 2]);
      }
      if (i - 1 <= 8 && j - 2 <= 8 && i - 1 > 0 && j - 2 > 0) {
        availableMoves[`[${i},${j}]`].push([i - 1, j - 2]);
      }
      if (i + 2 <= 8 && j + 1 <= 8 && i + 2 > 0 && j + 1 > 0) {
        availableMoves[`[${i},${j}]`].push([i + 2, j + 1]);
      }
      if (i - 2 <= 8 && j + 1 <= 8 && i - 2 > 0 && j + 1 > 0) {
        availableMoves[`[${i},${j}]`].push([i - 2, j + 1]);
      }
      if (i + 2 <= 8 && j - 1 <= 8 && i + 2 > 0 && j - 1 > 0) {
        availableMoves[`[${i},${j}]`].push([i + 2, j - 1]);
      }
      if (i - 2 <= 8 && j - 1 <= 8 && i - 2 > 0 && j - 1 > 0) {
        availableMoves[`[${i},${j}]`].push([i - 2, j - 1]);
      }
    }
  }
};

const knightMoves = (start, end = null) => {
  /* For better readability I made this helper function that
  returns the inputted square's potential moves in an array. */
  function moves(move) {
    return availableMoves[`[${move.toString()}]`];
  }

  // First, queue up the 'root' node which is the starting square
  let queue = [];
  queue.push(new Node(start));

  while (end !== true) {
    // First, add the children (moves from current spot) to its own array
    let children = moves(queue[0].value);

    /* Now iterate through the children array and make a new node for each 
    child that links back to the square it came from */
    for (let i = 0; i < children.length; i++) {
      queue.push(new Node(children[i], queue[0]));
    }

    /* Need to save popped value so we can evaluate all elements
    without it shifting again */
    let poppedValue = queue.shift();
    // Check if the square we are at is the desired square
    if (poppedValue.value[0] === end[0] && poppedValue.value[1] === end[1]) {
      end = true;
      /* Go up the tree, for each node up the tree add one to depth
      (which tells how many moves) and add each square to the movesArr.
      Print when we go past the top of the tree */
      let depth = 0;
      let movesArr = [];
      while (poppedValue != null) {
        movesArr.unshift(poppedValue.value);
        poppedValue = poppedValue.prev;
        depth++;
      }
      console.log(`It took you ${depth} moves! Here's the order:`);
      for (let i = 0; i < movesArr.length; i++) {
        console.log(`[${movesArr[i]}]`);
      }
      return;
    }
  }
};

populateMoves();

knightMoves([3, 3], [1, 8]);
