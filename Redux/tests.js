/**
 * Tests for Redux Clone
 */

const INCREMENT_COUNT = "INCREMENT_COUNT";
const DECREMENT_COUNT = "DECREMENT_COUNT";

let firstReducer = (
	state = { count: 0 },
	action = { type: INCREMENT_COUNT }
) => {
	switch (action.type) {
		case INCREMENT_COUNT:
			return { count: (state.count || 0) + 1 };
		case DECREMENT_COUNT:
			return { count: (state.count || 0) - 1 };
		default:
			return state;
	}
};

/**
 * Multiple Reducer tests
 */
const SET_TEXT = "SET_TEXT";
let otherReducer = (
	state = { text: "" },
	action = { type: SET_TEXT, text: "" }
) => {
	switch (action.type) {
		case SET_TEXT:
			return { text: action.text || "" };
		default:
			return state;
	}
};

const singleReducerTests = () => {
	let store = createStore(firstReducer);

	console.group();
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
};

const multipleReducerTests = () => {
	let store = createStore(
		combineReducers({
			countState: firstReducer,
			textState: otherReducer,
		})
	);

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

	console.log(
		"Dispatching: ",
		SET_TEXT,
		store.dispatch({ type: SET_TEXT, text: "Updated Text" })
	);
	console.log("Updated State: ", store.getState());
	console.groupEnd();
};
