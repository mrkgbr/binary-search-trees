import { mergeSort } from "./modules/mergesort.js";
import { prettyPrint } from "./modules/prettyprint.js";

function node(data, left = null, right = null) {
  // accepts 3 value to create a node
  return {
    data: data,
    left: left,
    right: right,
  };
}

function tree(array) {
  // accepts an array when initialized
  array = mergeSort(array);
  let root = buildTree(array);

  function buildTree(arr) {
    // Recursive calls for building the tree.
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
    prevNode[side] = newNode;
  }

  function deleteData(root, k) {
    // Base case
    if (root == null) return root;

    // Recursive calls for ancestors of
    // node to be deleted
    if (root.data > k) {
      root.left = deleteData(root.left, k);
      return root;
    } else if (root.data < k) {
      root.right = deleteData(root.right, k);
      return root;
    }

    // We reach here when root is the node
    // to be deleted.

    // If one of the children is empty
    if (root.left == null) {
      let temp = root.right;
      return temp;
    } else if (root.right == null) {
      let temp = root.left;
      return temp;
    }

    // If both children exist
    else {
      let succParent = root;

      // Find successor
      let succ = root.right;

      while (succ.left != null) {
        succParent = succ;
        succ = succ.left;
      }

      // Delete successor. Since successor
      // is always left child of its parent
      // we can safely make successor's right
      // right child as left of its parent.
      // If there is no succ, then assign
      // succ->right to succParent->right
      if (succParent != root) succParent.left = succ.right;
      else succParent.right = succ.right;

      // Copy Successor Data to root
      root.data = succ.data;

      return root;
    }
  }

  function findData(data) {
    // accepts a value and returns the node
    // with the given value
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

  function levelOrder(func = null) {
    // Accepts another function as a parameter.
    // Should traverse the tree in breadth-first
    // level order and provide each node as the
    // argument to the provided function.
    // The method should return an array of values
    // if no function is given.
    let queue = [];
    queue.push(root);
    while (queue.length != 0) {
      let currentNode = queue[0];
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
      console.log(currentNode.data);
      queue.shift();
    }
  }

  function inorder(root = null) {
    // traverse the tree in inorder
    // and return an array of values
    if (root == null) return [];
    let left = inorder(root.left);
    let data = [root.data];
    let right = inorder(root.right);
    return [...left, ...data, ...right];
  }

  function preorder(root = null) {
    // traverse the tree in preorder
    // and return an array of values
    if (root == null) return [];
    let data = [root.data];
    let left = preorder(root.left);
    let right = preorder(root.right);
    return [...data, ...left, ...right];
  }

  function postorder(root = null) {
    // traverse the tree in postorder
    // and return an array of values
    if (root == null) return [];
    let left = postorder(root.left);
    let right = postorder(root.right);
    let data = [root.data];
    return [...left, ...right, ...data];
  }

  function height(data, currentRoot = root) {
    // Accepts a node and returns its height.
    // Height is defined as the number of edges
    // in longest path from a given node to a leaf node.
    if (currentRoot == null) return;
    while (currentRoot) {
      if (data < currentRoot.data) {
        currentRoot = currentRoot.left;
      } else if (data > currentRoot.data) {
        currentRoot = currentRoot.right;
      }
      break;
    }

    return getHeight(currentRoot);

    function getHeight(root, counter = 0) {
      // recursive find the longest side
      if (root == null) return counter;
      if (root != currentRoot) counter++;
      const left = getHeight(root.left, counter);
      const right = getHeight(root.right, counter);
      return left > right ? left : right;
    }
  }

  function depth(data, currentRoot = root) {
    //
    if (currentRoot == null) return;
    let counter = 0;
    while (currentRoot) {
      if (data < currentRoot.data) {
        currentRoot = currentRoot.left;
        counter++;
      } else if (data > currentRoot.data) {
        currentRoot = currentRoot.right;
        counter++;
      }
      break;
    }
    return counter;
  }

  function isBalanced(currentRoot = root) {
    // Accepts a node and returns its depth.
    // Depth is defined as the number of edges
    // in path from a given node to the tree’s root node.
    let result = balancedHeight(currentRoot);
    if (result == -1) return false;
    return true;
  }

  function balancedHeight(currentRoot) {
    // Function which checks if the tree is balanced.
    // A balanced tree is one where the difference
    // between heights of left subtree and right subtree
    // of every node is not more than 1.
    if (currentRoot == null) {
      return 0;
    }
    let leftNode = balancedHeight(currentRoot.left);
    if (leftNode == -1) return -1;
    let rightNode = balancedHeight(currentRoot.right);
    if (rightNode == -1) return -1;

    if (Math.abs(leftNode - rightNode) > 1) return -1;

    return Math.max(leftNode, rightNode) + 1;
  }

  function rebalance(currentRoot = root) {
    //
    let arr = preorder(currentRoot);
    let newRoot = buildTree(arr);
    myTree.root = newRoot;
  }

  return {
    root,
    findData,
    insertData,
    deleteData,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

function randomArray(numOfItems) {
  let arr = [];
  for (let i = 0; i < numOfItems; i++) {
    let randomNum = Math.floor(Math.random() * 1000);
    arr.push(randomNum);
  }
  return arr;
}

// let myArr = randomArray(15);
let myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let myTree = tree(myArr);
let myRoot = myTree.root;
// myTree.insertData(8);
// myTree.insertData(5);
// myTree.insertData(30);
myTree.insertData(16);
myTree.insertData(17);
myTree.insertData(18);
// prettyPrint(myRoot);
// myTree.deleteData(myTree.root, 23);
prettyPrint(myTree.root);
// myTree.levelOrder();
// console.log(myTree.inorder(myRoot));
// console.log(myTree.preorder(myRoot));
// console.log(myTree.postorder(myRoot));
// console.log(myTree.height(8));
// console.log(myTree.depth(8));
// console.log(myTree.isBalanced());

// myTree.preorder(myTree.root);
// myTree.postorder(myTree.root);
myTree.rebalance();
prettyPrint(myTree.root);
/*
1. Take an array
2. Set middle as root
3. Split the array to left and right
4. Left contains a new array with items left to the middle, same to right.
1...
*/
