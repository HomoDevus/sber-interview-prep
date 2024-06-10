
// This is a JavaScript coding problem from BFE.dev 

/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) {
  let lastFn
  let isThrottled = false

  return (...args) => {
    if (isThrottled) {
      lastFn = func.bind(this, ...args)
    } else {
      isThrottled = true
      func.call(this, ...args)

      setTimeout(() => {
        if (lastFn) {
          lastFn()
        }

        isThrottled = false
      }, wait)
    }
  }
}



