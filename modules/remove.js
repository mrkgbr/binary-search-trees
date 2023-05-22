export function removeDuplicates(arr) {
  let newArr = [];
  arr.forEach((element) => {
    if (newArr.indexOf(element) == -1) {
      newArr.push(element);
    }
  });
  return newArr;
}

removeDuplicates([0, 1, 2, 3, 2, 4, 3, 5]);
