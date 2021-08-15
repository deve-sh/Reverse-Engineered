/**
 * Simple Redux Clone
 */

class Redux {
	#state = {};
	#reducers = {};
	#subscribers = [];

	constructor(reducers, initialState) {
		if (!reducers || !initialState || !initialState instanceof Object)
			throw new Error("Reducers and initialState are required.");

		this.#state = initialState || {};
		this.#reducers = reducers || (() => null);
		this.#subscribers = [];
	}

	#isSingleReducer() {
		return (
			this.#reducers instanceof Function ||
			!this.#reducers instanceof Object ||
			Object.keys(this.#reducers).length === 0
		);
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

	dispatch(action) {
		let newState = this.getState();

		if (!this.#isSingleReducer()) {
			for (let reducer in this.#reducers) // Applying action based on each reducer.
				if (this.#reducers[reducer] instanceof Function)
					newState[reducer] = this.#reducers[reducer](this.getState(), action);
		} else {
			newState =
				this.#reducers instanceof Function
					? this.#reducers(this.#state, action)
					: newState;
		}

		this.#setState(newState);
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

function combineReducers(reducerMap = {}) {
	return reducerMap;
}

function createStore(reducers, initialState) {
	if (instance) return instance;
	else {
		instance = new Redux(reducer, initialState);
		return instance;
	}
}
