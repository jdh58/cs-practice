class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.root = buildTree(arr, 0, arr.length - 1);
  }

  insert(value, root = this.root) {
    if (value < root.data) {
      if (root.left === null) {
        root.left = new Node(value);
      } else {
        this.insert(value, root.left);
      }
    } else {
      if (root.right === null) {
        root.right = new Node(value);
      } else {
        this.insert(value, root.right);
      }
    }
  }

  /* Super scuffed logic, I figured I didn't need to watch the supplemental
  videos because I didn't for insert, but this was far more difficult. I actually
  got it 90% there by using the existing inorder() operation array, but
  for some reason couldn't come to the simple solution to call delete() recursively
  if the replacement node had children. It occured to me but I thought I'd
  have to rewrite the entire delete function. Honestly not sure why I didn't
  use recursion in the first place but whatever. */
  delete(value, node = this.find(value)) {
    let tree = this.inorder();
    console.log(tree);
    let leftOrRight = null;

    for (let i = 0; i < tree.length; i++) {
      if (tree[i].left === node || tree[i].right === node) {
        if (tree[i].left === node) {
          leftOrRight = "left";
        } else {
          leftOrRight = "right";
        }

        if (this.isDeadEnd(tree[i][leftOrRight])) {
          tree[i][leftOrRight] = null;
        } else if (
          tree[i][leftOrRight].left === null &&
          tree[i][leftOrRight].right !== null
        ) {
          tree[i][leftOrRight] = tree[i][leftOrRight].right;
        } else if (
          tree[i][leftOrRight].left !== null &&
          tree[i][leftOrRight].right === null
        ) {
          tree[i][leftOrRight] = tree[i][leftOrRight].left;
        } else if (
          tree[i][leftOrRight].left !== null &&
          tree[i][leftOrRight].right !== null
        ) {
          /* Set the value of the value we want to remove to the value of
          its inorder successor */
          for (let i = 0; i < tree.length; i++) {
            if (tree[i] === node) {
              tree[i].data = tree[i + 1].data;

              /* Now we need to remove the inorder successor so we dont have duplicates.
              Send in a filler value for the value, and the node we want to delete
              since we already know it. It won't re-call delete again because the
              inorder successor can't have any left children by definition.  */
              this.delete(null, tree[i + 1]);
            }
          }
        }
      }
    }
  }

  find(value) {
    let tree = this.preorder();
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].data === value) {
        return tree[i];
      }
    }
  }

  levelOrder(root = this.root, func) {
    if (root === null) {
      return;
    }
    let arr = [];
    let returnArr = [];
    arr.unshift(root);
    while (arr.length > 0) {
      root = arr[0];

      if (root.left !== null) {
        arr.push(root.left);
      }
      if (root.right !== null) {
        arr.push(root.right);
      }

      if (!func) {
        returnArr.push(arr.shift());
      } else {
        func(arr.pop());
      }
    }
    if (!func) {
      return returnArr;
    }
  }

  preorder(root = this.root, arr = [], func) {
    if (root === null) {
      return;
    }
    if (!func) {
      arr.push(root);
    } else {
      func(root);
    }
    this.preorder(root.left, arr);
    this.preorder(root.right, arr);
    return arr;
  }

  inorder(root = this.root, arr = [], func) {
    if (root === null) {
      return;
    }
    this.inorder(root.left, arr);
    if (!func) {
      arr.push(root);
    } else {
      func(root);
    }
    this.inorder(root.right, arr);
    return arr;
  }

  postorder(root = this.root, arr = [], func) {
    if (root === null) {
      return;
    }
    this.postorder(root.left, arr);
    this.postorder(root.right, arr);
    if (!func) {
      arr.push(root);
    } else {
      func(root);
    }
    return arr;
  }

  height(node) {
    if (node === null) {
      return 0;
    } else if (this.isDeadEnd(node.left) && this.isDeadEnd(node.right)) {
      return 1;
    }
    let left = this.height(node.left);
    let right = this.height(node.right);

    return 1 + Math.max(left, right);
  }

  isDeadEnd(node) {
    if (node === null) {
      return true;
    } else if (node.left === null && node.right === null) {
      return true;
    } else {
      return false;
    }
  }

  isBalanced(node = this.root) {
    // If we went to a node that doesnt exist, just back out with a non-falsy value
    if (node === null) {
      return "not falsy";
    }

    // Check if left and right have a disparity in height of more than 1
    if (Math.abs(this.height(node.left) - this.height(node.right)) > 1) {
      return false;
    }

    /* If not, go one level deeper with recursion. If either have a disparity
    in height of more than 1, it will return false and that false return
    will bubble up all the way to the top. Because any false return means an
    unbalanced tree */
    if (!this.isBalanced(node.left) || !this.isBalanced(node.right)) {
      return false;
    }

    /* If we reached the end, that means nowhere in our tree did we find a
    height disparity of more than 1. The tree is balanced. */
    return true;
  }

  rebalance() {
    let oldArr = this.inorder();
    let newArr = [];
    for (let i = 0; i < oldArr.length; i++) {
      newArr.push(oldArr[i].data);
    }
    console.log(newArr);
    this.root = buildTree(newArr, 0, newArr.length - 1);
  }

  getRoot() {
    return this.root;
  }
}

function buildTree(arr, start, end) {
  arr = mergeSort(arr);
  if (start > end) {
    return null;
  }

  let mid = Math.ceil((start + end) / 2);
  let root = new Node(arr[mid]);

  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);

  return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function mergeSort(arr) {
  // arr = noDupes(arr);
  // If the array has a length of 1, it's already sorted
  if (arr.length < 2) {
    return arr;
  } else {
    // Get the sides sorted and store them
    let left = mergeSort(arr.slice(0, arr.length / 2));
    let right = mergeSort(arr.slice(arr.length / 2));

    // Once we've sorted the left and the right, merge them!
    let newArr = [];
    while (left.length > 0 || right.length > 0) {
      if (left[0] < right[0] || right.length <= 0) {
        /* We need the right.length <= 0 check so it doesnt
        try and run the 'else' part on an empty right array */
        newArr.push(left[0]);
        left.shift();
      } else {
        newArr.push(right[0]);
        right.shift();
      }
    }

    /* Return this new array to either be sorted again or
    as the final answer */
    return newArr;
  }
}

// function noDupes(arr) {
//   let newArr = [];
//   let dupe = null;
//   for (let i = 0; i < arr.length; i++) {
//     dupe = false;
//     for (let j = 0; j < arr.length; j++) {
//       if (arr[i] === arr[j] && i !== j) {
//         dupe = true;
//         console.log("dsaa");
//       }
//     }
//     if (!dupe) {
//       console.log("dssad");
//       newArr.push(arr[i]);
//     }
//   }
//   return newArr;
// }

// console.log(mergeSort([1, 7, 4, 23, 8, 3, 5, 9, 67, 6345, 324]));
let tree = new Tree([1, 23, 8, 9, 4, 3, 5, 7, 67, 6345, 324]);

console.log(tree.isBalanced());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);
tree.insert(117);
console.log(tree.isBalanced());
prettyPrint(tree.getRoot());
console.log(tree.inorder());
tree.rebalance();
prettyPrint(tree.getRoot());
console.log(tree.isBalanced());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());
