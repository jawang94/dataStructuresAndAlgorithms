let arr = [1, 4, 5, 6, 31, 515, 123, 45246, 5484, 673, 451, 341, 5, 8];

const mergeSort = arr => {
  if (arr.length < 2) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right);
};

const merge = (left, right) => {
  let result = [];

  while (left.length > 0 && right.length > 0) {
    result.push(left[0] < right[0] ? left.shift() : right.shift());
  }

  return result.concat(left.length ? left : right);
};

mergeSort(arr);
