/**
 * Simple Redux Clone
 */

class Redux {
	#state = {};
	#reducer = () => null;
	#subscribers = [];
	#middlewares = [];

	constructor(reducer, initialState) {
		if (
			!reducer ||
			!initialState ||
			!reducer instanceof Function ||
			!initialState instanceof Object
		)
			throw new Error("Reducer and initialState are required.");

		this.#state = initialState || {};
		this.#reducer = reducer;
		this.#subscribers = [];
		this.#middlewares = [];
	}

	getState() {
		return this.#state;
	}

	#notifySubscribers() {
		if (this.#subscribers.length) {
			// Notify subscribers of change to state.
			for (let func of this.#subscribers) func(this.getState());
		}
	}

	// # -> Private Class Method
	#setState(newState) {
		if (!newState || !newState instanceof Object) return;
		this.#state = newState;
		this.#notifySubscribers();
	}

	// Work In Progress, don't fully understand the full flow of applying middlewares to Redux.
	#applyMiddlewaresToAction(action, finished) {
		if (this.#middlewares.length) {
			let lastResult = null;
			for (let i = 0; i < this.#middlewares.length; ) {
				if (middleware instanceof Function) {
					let next = (result) => {
						lastResult = result;
						if (this.#middlewares[i + 1] instanceof Function) {
							let nextMiddleware = this.#middlewares[i + 1];
							i++;
							nextMiddleware(this.getState(), action, lastResult);
						} else finished(lastResult, action);
					};

					lastResult = middleware(this.getState(), action, next);
				} else finished(lastResult, action);
			}
		}
	}

	dispatch(action) {
		if (this.#reducer instanceof Function) {
			this.#setState(this.#reducer(this.#state, action));
		}
	}

	subscribe(callbackFunction) {
		// Check if functiion has already been added to list of subscribers.
		for (let i = 0; i < this.#subscribers.length; i++)
			if (this.#subscribers[i] === callbackFunction) return;
		this.#subscribers.push(callbackFunction);
	}
}

// Export a singleton instance of the above class. So each part of the app has access to only one instance.
let instance = null;
function createStore(reducer, initialState) {
	if (instance) return instance;
	else {
		instance = new Redux(reducer, initialState);
		return instance;
	}
}
