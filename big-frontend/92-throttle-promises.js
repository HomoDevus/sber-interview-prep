
/**
 * @param {() => Promise<any>} func
 * @param {number} max
 * @return {Promise}
 */
async function throttlePromises(funcs, max) {
  let index = 0
  const responses = []
  const requests = []

  async function runFunction(functIndex) {
    responses[functIndex] = await funcs[functIndex]()

    if (index < funcs.length) await runFunction(index++)
  }

  for (let i = 0; i < funcs.length && i < max; i++) {
    requests.push(runFunction(index++))
  }

  await Promise.all(requests)

  return responses
}
