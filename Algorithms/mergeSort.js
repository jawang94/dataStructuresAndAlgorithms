const mergeSort = input => {
  if (input.length < 2) return input;

  const mid = Math.floor(input.length / 2);
  const left = mergeSort(input.slice(0, mid));
  const right = mergeSort(input.slice(mid));

  return merge(left, right);
};

const merge = (left, right) => {
  const output = [];

  while (left.length > 0 && right.length > 0) {
    output.push(left[0] < right[0] ? left.shift() : right.shift());
  }

  return output.concat(left.length ? left : right);
};

let arr = [12, 43, 77, 15, 56];
console.log(mergeSort(arr));
// output = [12, 15, 43, 56, 77];
