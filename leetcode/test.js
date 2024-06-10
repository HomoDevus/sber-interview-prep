/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  const postfix = []
  const prefix = []
  const res = []

  for (let i = 0; i < nums.length; i++) {
      if (i === 0) {
          prefix.push(nums[i])
      } else {
          prefix.push(prefix[i - 1] * nums[i])
      }
  }

  for (let i = nums.length - 1; i >= 0; i--) {
      if (i === nums.length - 1) {
          postfix[i] = nums[i]
      } else {
          postfix[i] = postfix[i + 1] * nums[i]
      }
  }

  for (let i = 0; i < nums.length; i++) {
      if (i === 0) {
          res.push(postfix[i + 1])
      } else if (i === nums.length - 1) {
          res.push(prefix[i - 1])
      } else {
          res.push(prefix[i - 1] * postfix[i + 1])
      }
  }

  return res
};

console.log(productExceptSelf([1, 2, 3, 4]))