/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function isEqual(a, b) {
  if (typeof a !== typeof b) return false
  if (typeof a === 'object') {
    if (Object.keys(a).length !== Object.keys(b).length) return false
    if (a.length === 0) return true
    
    for (const key in a) {
      if (a[key] === undefined || b[key] === undefined) return false
      if (a[key] === a || b[key] === b) return a[key] === a && b[key] === b
      if (String(a[key]) !== String(b[key])) return false
      if (!isEqual(a[key], b[key])) return false
    }

    return true
  }

  return a === b
}