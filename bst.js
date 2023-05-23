import { mergeSort } from "./modules/mergesort.js";
import { prettyPrint } from "./modules/prettyprint.js";

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

  function insertData(data) {
    // accepts a value to insert a node
    let currentNode = root;
    let prevNode = null;
    let side = null;
    let newNode = node(data);
    while (currentNode) {
      if (currentNode.data == data) {
        return;
      }
      prevNode = currentNode;
      if (data < currentNode.data) {
        currentNode = currentNode.left;
        side = "left";
      } else {
        currentNode = currentNode.right;
        side = "right";
      }
    }
    if (side == "left") {
      prevNode.left = newNode;
    } else if (side == "right") {
      prevNode.right = newNode;
    }
  }

  function deleteData(data) {
    // accepts a value to delete a node
  }

  function findData(data) {
    // accepts a value and returns the node with the given value
    let currentNode = root;
    while (currentNode) {
      if (currentNode.data == data) {
        return currentNode;
      }
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  return { root, findData, insertData };
}

let myTree = tree([5, 7, 9, 10, 13, 15, 17, 22, 25, 27]);
prettyPrint(myTree.root);
myTree.insertData(8);
myTree.insertData(5);
myTree.insertData(30);
myTree.insertData(16);
prettyPrint(myTree.root);
console.log(myTree.findData(16));

/*
1. Take an array
2. Set middle as root
3. Split the array to left and right
4. Left contains a new array with items left to the middle, same to right.
1...
*/