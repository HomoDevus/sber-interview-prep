var flat = function (arr, n) {
  let res = [];

  (function flatRecursion(arr, n) {
      for (let val of arr) {
          if (Array.isArray(val) && n > 0) {
              flatRecursion(val, n - 1)
          } else {
              res.push(val)
          }
      }
  })(arr, n)

  return res
};

console.log(flat([1, { a: [2, 3] }, 4, [5, [6, [7, 8, 9]]], [[7], 8, 9], 10], 100))
