/**
 * Tests for Redux Clone
 */

console.group();
const INCREMENT_COUNT = "INCREMENT_COUNT";
const DECREMENT_COUNT = "DECREMENT_COUNT";

let reducer = (state = { count: 0 }, action = { type: INCREMENT_COUNT }) => {
	switch (action.type) {
		case INCREMENT_COUNT:
			return { count: (state.count || 0) + 1 };
		case DECREMENT_COUNT:
			return { count: (state.count || 0) - 1 };
		default:
			return state;
	}
};

let store = createStore(reducer);

console.log("Initial State: ", store.getState());
console.log(
	"Dispatching: ",
	INCREMENT_COUNT,
	store.dispatch({ type: INCREMENT_COUNT })
);
console.log("Updated State: ", store.getState());
console.log(
	"Dispatching: ",
	DECREMENT_COUNT,
	store.dispatch({ type: DECREMENT_COUNT })
);
console.log("Updated State: ", store.getState());
console.groupEnd();