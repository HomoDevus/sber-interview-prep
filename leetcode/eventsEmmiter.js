class EventEmitter {
  constructor() {
    this.events = new Map()
  }

  /**
   * @param {string} eventName
   * @param {Function} callback
   * @return {Object}
   */
  subscribe(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [])
    }

    const event = this.events.get(eventName)
    const eventIndex = event.push(callback) - 1

    return {
      unsubscribe: () => {
        event.splice(eventIndex, 1)
      },
    }
  }

  /**
   * @param {string} eventName
   * @param {Array} args
   * @return {Array}
   */
  emit(eventName, args = []) {
    const responses = []
    const events = this.events.get(eventName)

    if (!events) return []

    for (const eventFn of events) {
      responses.push(eventFn.call(null, ...args))
    }

    return responses
  }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */

const emitter = new EventEmitter()
const sub = emitter.subscribe('firstEvent', (...args) => args.join(','))
console.log(emitter.emit('firstEvent', [1, 2, 3])) // ["1,2,3"]
sub.unsubscribe() // undefined
console.log(emitter.emit('firstEvent', [4, 5, 6])) // [], there are no subscriptions
