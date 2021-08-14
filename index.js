/**
 * Simple Redux Clone
 */

class Redux {
	constructor(reducer, initialState) {
		if (
			!reducer ||
			!initialState ||
			!reducer instanceof Function ||
			!initialState instanceof Object
		)
			throw new Error("Reducer and initialState are required.");

		this.state = initialState || {};
		this.reducer = reducer;
		this.subscribers = [];
		this.middlewares = [];
	}

	getState() {
		return this.state;
	}

	// # -> Private Class Method
	#setState(newState) {
		if (!newState) return;

		this.state = newState;
		if (this.subscribers.length) {
			// Notify subscribers of change to state.
			for (let func of this.subscribers) func(this.getState());
		}
	}

	dispatch(action) {
		if (this.reducer instanceof Function) {
			this.#setState(this.reducer(this.state, action));
		}
	}

	subscribe(callbackFunction) {
		// Check if functiion has already been added to list of subscribers.
		for (let i = 0; i < this.subscribers.length; i++)
			if (this.subscribers[i] === callbackFunction) return;
		this.subscribers.push(callbackFunction);
	}
}

// Export a singleton instance of the above class. So each part of the app has access to only one instance.
