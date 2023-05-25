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

  function inorder(currentRoot) {
    // traverse the tree in inorder
    // and return an array of values
    if (currentRoot == null) return [];
    let left = inorder(currentRoot.left);
    let data = [currentRoot.data];
    let right = inorder(currentRoot.right);
    return [...left, ...data, ...right];
  }

  function preorder(currentRoot) {
    // traverse the tree in preorder
    // and return an array of values
    if (currentRoot == null) return [];
    let data = [currentRoot.data];
    let left = preorder(currentRoot.left);
    let right = preorder(currentRoot.right);
    return [...data, ...left, ...right];
  }

  function postorder(currentRoot) {
    // traverse the tree in postorder
    // and return an array of values
    if (currentRoot == null) return [];
    let left = postorder(currentRoot.left);
    let right = postorder(currentRoot.right);
    let data = [currentRoot.data];
    return [...left, ...right, ...data];
  }

  function height(data, currentRoot) {
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

  function depth(data, currentRoot) {
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

  function isBalanced(currentRoot) {
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

  function rebalance(currentRoot) {
    //
    let arr = preorder(currentRoot);
    let newRoot = buildTree(arr);
    return newRoot;
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

function randomInsert(numOfTimes) {
  for (let i = 0; i < numOfTimes; i++) {
    let randomNum = Math.floor(Math.random() * 1000);
    myTree.insertData(randomNum);
  }
}

let myArr = randomArray(15);
let myTree = tree(myArr);
console.log("Tree is balanced: " + myTree.isBalanced(myTree.root));
console.log("Inorder:");
console.log(myTree.inorder(myTree.root));
console.log("Preorder:");
console.log(myTree.preorder(myTree.root));
console.log("Postorder:");
console.log(myTree.postorder(myTree.root));
randomInsert(80);
console.log("Tree is balanced: " + myTree.isBalanced(myTree.root));
myTree.root = myTree.rebalance(myTree.root);
console.log("Tree is balanced: " + myTree.isBalanced(myTree.root));
console.log("Inorder:");
console.log(myTree.inorder(myTree.root));
console.log("Preorder:");
console.log(myTree.preorder(myTree.root));
console.log("Postorder:");
console.log(myTree.postorder(myTree.root));
