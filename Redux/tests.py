# Tests for Python Implementation of Redux

from Redux import create_store, combine_reducers

INCREMENT_COUNT = "INCREMENT_COUNT"
DECREMENT_COUNT = "DECREMENT_COUNT"


def firstReducer(state={"count": 0}, action={"type": INCREMENT_COUNT}):
    if action["type"] == INCREMENT_COUNT:
        return {"count": (state.count or 0) + 1}
    elif action["type"] == DECREMENT_COUNT:
        return {"count": (state.count or 0) - 1}
    else:
        return state


"""
    Multiple Reducer tests
"""

SET_TEXT = "SET_TEXT"


def otherReducer(state={"text": ""}, action={"type": SET_TEXT, "text": ""}):
    if action["type"] == SET_TEXT:
        return {"text": action["text"] or ""}
    else:
        return state


def singleReducerTests():
    store = create_store(firstReducer)

    print("Initial State: ", store["get_state"]())
    print(
        "Dispatching: ", INCREMENT_COUNT, store["dispatch"]({"type": INCREMENT_COUNT})
    )
    print("Updated State: ", store["get_state"]())
    print(
        "Dispatching: ", DECREMENT_COUNT, store["dispatch"]({"type": DECREMENT_COUNT})
    )
    print("Updated State: ", store["get_state"]())


def multipleReducerTests():
    store = create_store(
        combine_reducers(
            {
                "countState": firstReducer,
                "textState": otherReducer,
            }
        )
    )

    print("Initial State: ", store["get_state"]())
    print(
        "Dispatching: ", INCREMENT_COUNT, store["dispatch"]({"type": INCREMENT_COUNT})
    )
    print("Updated State: ", store["get_state"]())
    print(
        "Dispatching: ", DECREMENT_COUNT, store["dispatch"]({"type": DECREMENT_COUNT})
    )
    print("Updated State: ", store["get_state"]())

    print(
        "Dispatching: ",
        SET_TEXT,
        store["dispatch"]({"type": SET_TEXT, "text": "Updated Text"}),
    )
    print("Updated State: ", store["get_state"]())

multipleReducerTests()