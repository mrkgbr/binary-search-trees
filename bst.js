import { mergeSort } from "./modules/mergesort.js";

function node(data, left = null, right = null) {
  return {
    data: data,
    left: left,
    right: right,
  };
}

function tree(array) {
  array = mergeSort(array);
  let root = buildTree(array);

  function buildTree(arr) {
    if (arr.length == 0) {
      return null;
    }
    let start = 0;
    let end = arr.length - 1;
    let mid = Math.floor((start + end) / 2);
    let left = buildTree(arr.slice(start, mid));
    let right = buildTree(arr.slice(mid + 1));
    let newNode = node(arr[mid], left, right);
    return newNode;
  }

  return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// prettyPrint(tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));
// prettyPrint(tree([1, 2, 3, 4]));
prettyPrint(tree([5, 7, 9, 10, 13, 15, 17, 22, 25, 27]));

// console.log(tree([1, 2, 3, 4, 5, 6, 7]));

/*
1. Take an array
2. Set middle as root
3. Split the array to left and right
4. Left contains a new array with items left to the middle, same to right.
1...
*/
