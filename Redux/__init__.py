"""
Redux clone from JavaScript to Python
A Work-In-Progress

Utilizes Singleton and Observer Design Patterns

__variableName -> Private variables
"""


class Redux:
    __subscribers = []
    __reducers = {}
    __state = {}

    def __init__(self, reducers, initial_state):
        if (
            not callable(reducers) and not type(self.__reducers) is dict
        ) or not initial_state:
            raise "Reducers and initial state are required"
        self.__reducers = reducers or (lambda: None)
        self.__state = initial_state or {}

    def isSingleReducer(self):
        return (
            callable(self.__reducers)
            or not type(self.__reducers) is dict
            or len(self.__reducers.keys()) == 0
        )

    def get_state(self):
        return self.__state

    def __notify_subscribers(self):
        if self.__subscribers.length:
            for func in self.__subscribers:
                # Notify subscriber of change to state.
                func(self.get_state())


# Export a singleton instance of the above class. So each part of the app has access to only one instance.
instance = None


def combineReducers(reducerMap={}):
    return reducerMap


def createStore(reducers, initial_state):
    global instance
    if instance:
        return instance
    else:
        if not reducers:
            raise "Reducers not passed to createStore"
        if not initial_state:
            # Setting up initial_state from the default value returned by the reducer.
            if callable(reducers):
                initial_state = reducers(None, {}) or {}
            elif reducers is dict:
                # Multiple reducers passed.
                initial_state = {}
                for reducer in reducers:
                    initial_state[reducer] = reducers[reducer](None, {})
        instance = Redux(reducers, initial_state)
        return instance
