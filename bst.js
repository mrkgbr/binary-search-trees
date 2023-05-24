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
    //
    if (root == null) return [];
    let left = inorder(root.left);
    let data = [root.data];
    let right = inorder(root.right);
    return [...left, ...data, ...right];
  }

  function preorder(root = null) {
    //
    if (root == null) return [];
    let data = [root.data];
    let left = preorder(root.left);
    let right = preorder(root.right);
    return [...data, ...left, ...right];
  }

  function postorder(root = null) {
    //
    if (root == null) return [];
    let left = postorder(root.left);
    let right = postorder(root.right);
    let data = [root.data];
    return [...left, ...right, ...data];
  }

  function height() {
    //
  }

  function depth() {
    //
  }

  function isBalanced() {
    //
  }

  function rebalance() {
    //
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
  };
}

let myTree = tree([5, 7, 9, 10, 11, 13, 15, 17, 19, 20, 21]);
myTree.insertData(8);
myTree.insertData(5);
myTree.insertData(30);
myTree.insertData(16);
prettyPrint(myTree.root);
// myTree.deleteData(myTree.root, 23);
// prettyPrint(myTree.root);
// myTree.levelOrder();
console.log(myTree.inorder(myTree.root));
console.log(myTree.preorder(myTree.root));
console.log(myTree.postorder(myTree.root));
// myTree.preorder(myTree.root);
// myTree.postorder(myTree.root);

/*
1. Take an array
2. Set middle as root
3. Split the array to left and right
4. Left contains a new array with items left to the middle, same to right.
1...
*/
