'''
Redux clone from JavaScript to Python

Utilizes Singleton

__variableName -> Private variables
'''
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
