function objDiff(obj1, obj2) {
  const result = {}

  function getDiff(item1, item2, path = []) {
    if (
      (!isObject(item1) && !isObject(item2) && item1 !== item2) ||
      (isObject(item1) &&
        isObject(item2) &&
        Array.isArray(item1) ^ Array.isArray(item2)) ||
      isObject(item1) ^ isObject(item2)
    ) {
      addDiff(item1, item2, path)
    } else if (isObject(item1) && isObject(item2)) {
      for (const key of Object.keys(item1)) {
        if (item2.hasOwnProperty(key)) {
          getDiff(item1[key], item2[key], path.concat(key))
        }
      }
    }
  }

  function addDiff(val1, val2, path) {
    let resultPointer = result

    for (let i = 0; i < path.length - 1; i++) {
      const pathNode = path[i]
      if (!resultPointer[pathNode]) {
        resultPointer[pathNode] = {}
      }

      resultPointer = resultPointer[pathNode]
    }

    resultPointer[path.at(-1)] = [val1, val2]
  }

  getDiff(obj1, obj2)

  return result
}

function isObject(item) {
  return item !== null && typeof item === 'object'
}

console.log(objDiff({}, { a: 1, b: 2 }))
console.log(
  objDiff(
    { a: 1, v: 3, x: [], z: { a: null } },
    { a: 2, v: 4, x: [], z: { a: 2 } },
  ),
)
console.log(
  objDiff(
    { a: 5, v: 6, z: [1, 2, 4, [2, 5, 7]] },
    { a: 5, v: 7, z: [1, 2, 3, [1]] },
  ),
)
console.log(objDiff({ a: { b: 1 } }, { a: [5] }))
console.log(objDiff({ a: [1, 2, {}], b: false }, { b: false, a: [1, 2, {}] }))
console.log(objDiff({ a: 1 }, { a: [1, 2, {}] }))
