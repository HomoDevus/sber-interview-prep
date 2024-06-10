function jsonToMatrix(arr) {
	const values = new Map()

	for (let i = 0; i < arr.length; i++) {
		(function buildMap(item, path = []) {
			if (typeof item === 'object' && item !== null) {
				for (const key of Object.keys(item)) {
					buildMap(item[key], path.concat(key))
				}
			} else {
				const pathStr = path.join('.')

				if (!values.has(pathStr)) {
					values.set(pathStr, Array(arr.length).fill(''))
				}

				values.get(pathStr)[i] = item
			}
		})(arr[i])
	}

	const result = [Array.from(values.keys()).sort()]

	for (let i = 0; i < arr.length; i++) {
		result.push([])

		for (const key of result[0]) {
			result[i + 1].push(values.get(key)[i])
		}
	}

	return result
}

console.log(jsonToMatrix([{"b": 1, "a": 2}, {"b": 3, "a": 4}]))
console.log(jsonToMatrix([{"a": 1, "b": 2}, {"c": 3, "d": 4}, {}]))
console.log(jsonToMatrix([{"a": {"b": 1, "c": 2}}, {"a": {"b": 3, "d": 4}}]))