function mergeSort(originalArray) {
  const originalArrayLength = originalArray.length;
  if (originalArrayLength <= 1) {
    return originalArray;
  }

  const leftArrayLength = Math.floor(originalArrayLength / 2);
  const leftArray = originalArray.slice(0, leftArrayLength);
  const rightArray = originalArray.slice(leftArrayLength);
  const newLeftArray = mergeSort(leftArray);
  const newRightArray = mergeSort(rightArray);

  return merge(newLeftArray, newRightArray);
}

function merge(newLeftArray, newRightArray) {
  const newLength = newLeftArray.length + newRightArray.length;

  let newArray = [];

  for (let i = 1; i <= newLength; i++) {
    if (newLeftArray[0] === undefined && newRightArray[0] === undefined) {
      break;
    }
    if (newRightArray[0] === undefined || newLeftArray[0] < newRightArray[0]) {
      // Left is lower, pushing from left
      newArray.push(newLeftArray[0]);
      newLeftArray.shift();
    } else {
      // Right is lower, pushing from right
      newArray.push(newRightArray[0]);
      newRightArray.shift();
    }
  }

  return newArray;
}

console.log(mergeSort([])); // []
console.log(mergeSort([1])); // []
console.log(mergeSort([721, 678, 230, 910, 685, 360, 207, 985])); // [207, 230, 360, 678, 685, 721, 910, 985]
console.log(mergeSort([10, 7, 8, 9, 1, 5])); // [1, 5, 7, 8, 9, 10]
console.log(mergeSort([30, 20, 10, 50, 22, 33, 55])); //[10, 20, 22, 30, 33, 50, 55]
